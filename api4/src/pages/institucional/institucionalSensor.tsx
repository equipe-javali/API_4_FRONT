import React from "react";

const Sensores: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", margin: 0 }}>
      <header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Sensores</h1>
        <p>Entenda os sensores e como suas medições são calculadas.</p>
      </header>
      <main
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <section>
          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Termômetro</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              O termômetro é um sensor projetado para medir a temperatura do ar ou de uma superfície. Ele utiliza materiais
              que respondem à temperatura variando sua resistência elétrica, permitindo converter essas variações em uma
              leitura precisa de temperatura.
            </p>
            <h4>Fórmula de Calibração do Termômetro:</h4>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              T = a + bR
              <br />
              T: Temperatura em °C.
              <br />
              R: Resistência elétrica do sensor.
              <br />
              a: Fator de conversão.
              <br />
              b: Offset.
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Higrômetro</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              O higrômetro mede a umidade relativa do ar usando um sensor capacitivo. Este sensor detecta mudanças na
              capacitância causadas pela absorção ou liberação de água em um material higroscópico, traduzindo essas
              variações em um valor de umidade relativa.
            </p>
            <h4>Fórmula para Calcular a Umidade Relativa:</h4>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              UR = ((C - Cmin) / (Cmax - Cmin)) × 100%
              <br />
              UR: Umidade relativa do ar (%).
              <br />
              C: Capacitância medida.
              <br />
              Cmin: Capacitância mínima.
              <br />
              Cmax: Capacitância máxima.
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Anemômetro (Velocidade e Direção do Vento)</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              O anemômetro mede a direção e a velocidade do vento. A direção é determinada pela posição de aletas ou
              hélices em relação ao norte, enquanto a velocidade é calculada com base nas rotações de copos montados no
              sensor.
            </p>
            <h4>Fórmula para Velocidade do Vento:</h4>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              V = (N × C) / T
              <br />
              V: Velocidade do vento (m/s).
              <br />
              N: Número de rotações completas dos copos.
              <br />
              C: Fator de conversão.
              <br />
              T: Tempo (s).
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Pluviômetro</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Este sensor mede a quantidade de chuva com base nos pulsos elétricos gerados por gotas de água. Cada pulso é
              calibrado para representar um volume específico de chuva.
            </p>
            <h4>Conversão de Pulsos para Chuva:</h4>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              Cada pulso equivale a 0,25 mm de chuva. Por exemplo, 5 pulsos indicam 5 × 0,25 = 1,25 mm.
            </p>
            <h4>Conversão de mm para Litros por Metro Quadrado:</h4>
            <p style={{ fontStyle: "italic", color: "#333" }}>
              1 mm = 1 L/m²
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Sensores;
