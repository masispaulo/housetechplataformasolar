
import { GoogleGenAI } from "@google/genai";
import { QuoteDetails } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY not found. Please set the environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function createPrompt(consumptionValue: number): string {
    return `
    Você é um especialista em dimensionamento de sistemas de energia solar fotovoltaica no Brasil.
    Sua tarefa é analisar o valor de uma conta de luz mensal e gerar um orçamento detalhado e uma análise de viabilidade.

    Dados de Entrada:
    - Valor da conta de luz mensal: R$ ${consumptionValue.toFixed(2)}

    Premissas para seus cálculos (use-as como base):
    - Custo médio da energia (tarifa): R$ 1,12 por kWh.
    - Média de horas de sol pico (HSP) no MS : 5.12 horas/dia.
    - Custo médio do sistema instalado: R$ 3,20 por Watt-pico (Wp).
    - Fatores de geração sazonais (em relação à média):
      Jan: 1.15, Fev: 1.1, Mar: 1.05, Abr: 1.0, Mai: 0.9, Jun: 0.85,
      Jul: 0.85, Ago: 0.95, Set: 1.0, Out: 1.1, Nov: 1.15, Dez: 1.2
    
    Execute os seguintes passos e retorne a resposta EXCLUSIVAMENTE em um único objeto JSON válido, sem nenhum texto ou markdown (como \`\`\`json) ao redor.

    1.  **Cálculo de Consumo:** Calcule o consumo médio mensal de energia em kWh dividindo o valor da conta pela tarifa média.
    2.  **Dimensionamento do Sistema:**
        a. Calcule a geração diária necessária em kWh, adicionando uma margem de 15% ao consumo diário (consumo mensal / 30 dias) para cobrir perdas e futuras necessidades.
        b. Calcule o tamanho do sistema em kWp (quilowatt-pico) dividindo a geração diária necessária pela HSP.
    3.  **Seleção de Equipamentos:** Com base no tamanho do sistema em kWp, monte um kit fotovoltaico realista para o mercado brasileiro. Especifique a quantidade e a potência dos painéis (use painéis de 550W como padrão), o tipo e a potência do inversor, e inclua estrutura de montagem, cabos e proteções.
    4.  **Custo Total:** Calcule o custo total estimado do sistema (equipamentos + instalação) multiplicando o tamanho do sistema em Watts-pico (kWp * 1000) pelo custo médio por Wp.
    5.  **Análise Mensal:** Crie um array para os 12 meses do ano. Para cada mês:
        a. Calcule a "generationKwh": (Tamanho do sistema em kWp * HSP * 30 dias * fator sazonal do mês).
        b. Use "consumptionKwh" como o consumo médio mensal calculado no passo 1.
    6. **Cálculos Financeiros:**
        a. Calcule a economia anual ("annualSavingsBRL"): Some a geração de todos os meses, multiplique pelo custo da tarifa (R$ 0,95/kWh). Limite a economia ao valor do consumo total anual para evitar distorções. A economia real é o consumo que deixou de ser pago.
        b. Calcule o payback simples em anos ("paybackYears"): Divida o "totalCost" pela "annualSavingsBRL".
    7. **Resumo:** Crie um resumo ("summary") de uma frase explicando o resultado.

    O JSON de saída deve ter a seguinte estrutura:
    {
      "systemSizeKwP": number,
      "totalCost": number,
      "annualSavingsBRL": number,
      "paybackYears": number,
      "summary": string,
      "equipment": [
        { "item": string, "quantity": number, "description": string }
      ],
      "monthlyAnalysis": [
        { "month": string, "generationKwh": number, "consumptionKwh": number }
      ]
    }
    `;
}

export const generateSolarQuote = async (consumptionValue: number): Promise<QuoteDetails> => {
    const prompt = createPrompt(consumptionValue);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.3
            }
        });
        
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr) as QuoteDetails;
        return parsedData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && error.message.includes("API_KEY")) {
             throw new Error("A chave da API não foi configurada corretamente ou é inválida.");
        }
        throw new Error("Não foi possível gerar o orçamento. A IA pode estar sobrecarregada. Tente novamente em alguns instantes.");
    }
};
