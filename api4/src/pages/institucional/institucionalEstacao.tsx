import React from "react";

const Estacoes: React.FC = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", margin: 0 }}>
      <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "20px", textAlign: "center" }}>
        <h1>Estações</h1>
        <p>Conheça as estações e como funcionam.</p>
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
          {/* Introdução às Estações de Monitoramento */}
          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>O que é uma Estação Meteorológica?</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Uma estação meteorológica é um conjunto de equipamentos que coletam informações sobre o clima. Esses
              equipamentos medem parâmetros como temperatura, umidade do ar, velocidade do vento e quantidade de chuva e podem enviar alertas sobre alterações climáticas significativas.
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>Como as Estações Funcionam?</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
            As estações possuem sensores responsáveis por medir diferentes parâmetros ambientais, como:
              <ul>
                <strong>Temperatura</strong>: Mede a temperatura do ar.<br></br>
                <strong>Umidade</strong>: Mede a quantidade de água presente no ar.<br></br>
                <strong>Precipitação (Chuva)</strong>: Mede a quantidade de chuva caída.
              </ul>
              Esses dados são enviados ao sistema para análise e monitoramento. Os dados coletados são enviados para o banco de dados que os armazena para que sejam acessíveis no sistema, transformandos-os em informações importantes sobre o clima porsteriormente.
            </p>
          </article>


          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>Informações importantes sobre as Estações</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Ao cadastrar uma estação, o sistema cria um &quot;registro&quot; para ela e começa a coletar os dados do clima naquele local.
            </p>
              Para realizar o cadastro, você precisa fornecer informações como:
            </p>
            <ul style={{ lineHeight: "1.6", color: "#555" }}>
              <strong>Nome da estação:</strong> O nome que você dará à estação de monitoramento.<br></br>
              <strong>MAC address UID:</strong> Identificador único (MAC address) da estação, garantindo que ela seja única no sistema.<br></br>
              <strong>Localização:</strong> Onde a estação está instalada, por exemplo, um endereço ou ponto de referência.<br></br>
              <strong>Latitude e Longitude:</strong> Coordenadas geográficas para identificar a posição exata da estação. <br></br>
            </ul>
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>Exemplo de Cadastro de Estação</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Imagine que você está criando uma estação de monitoramento na sua escola. Você precisará preencher as seguintes informações:
              <ul>
                <strong>Nome</strong>: Estação Escola<br></br>
                <strong>Mac Adress UID</strong>: [UID fornecido pelo seu professor]<br></br>
                <strong>Endereço</strong>: Rua Principal, 123<br></br>
                <strong>Latitude</strong>: 23.5505<br></br>
                <strong>Longitude</strong>: -46.6333
              </ul>
              Após preencher, e só clicar em &quot;Cadastrar&quot; e a estação começa a monitorar o clima!
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>Exemplo de Funcionamento</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              Imagine que uma estação meteorológica está em uma cidade. O sensor de temperatura mede 25°C, o sensor de
              umidade detecta 60% de umidade, o anemômetro registra uma velocidade do vento de 15 km/h, e o pluviômetro
              detecta 5 mm de chuva. Esses dados são enviados para um computador que analisa e fornece informações sobre o
              clima. Caso algum dado esteja acima ou abaixo do normal, o sistema pode enviar um alerta para a Defesa Civil ou
              para o governo, por exemplo, para que medidas sejam tomadas.
            </p>
          </article>

          <article style={{ marginBottom: "20px" }}>
            <h3 style={{ color: "#4CAF50", fontSize: "1.4em" }}>Conclusão</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
            Agora que você sabe o que são as estações de monitoramento, como elas funcionam e como cadastrar uma estação, fica mais fácil entender como podemos usar a tecnologia para monitorar e aprender mais sobre o nosso clima!
            </p>
          </article>

        </section>
      </main>
    </div>
  );
};

export default Estacoes;
