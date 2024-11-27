import React from "react";

const Parametros: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", margin: 0 }}>
      <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "20px", textAlign: "center" }}>
        <h1>Parâmetros</h1>
        <p>Conheça os parâmetros monitorados e como são calculados.</p>
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
          <article style={{ marginBottom: "15px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Temperatura</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              A temperatura é calculada com base na resistência elétrica do termômetro, utilizando fatores de calibração e
              ajustes específicos para garantir precisão.
            </p>
          </article>
          <article style={{ marginBottom: "15px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Umidade Relativa do Ar</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              A umidade é determinada pela variação da capacitância do sensor higrômetro, influenciada pela quantidade de
              água absorvida pelo material higroscópico.
            </p>
          </article>
          <article style={{ marginBottom: "15px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Velocidade do Vento</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              A velocidade do vento é calculada a partir do número de rotações dos copos do anemômetro em intervalos de
              tempo definidos, permitindo medições precisas.
            </p>
          </article>
          <article style={{ marginBottom: "15px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.2em" }}>Quantidade de Chuva</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              A quantidade de chuva acumulada é convertida de milímetros para litros por metro quadrado, facilitando o
              monitoramento de precipitação em áreas específicas.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Parametros;
