import React, { useState } from "react";

const ManualUsuario: React.FC = () => {
  const [showEstacoes, setShowEstacoes] = useState(false);
  const [showParametros, setShowParametros] = useState(false);
  const [showSensores, setShowSensores] = useState(false);
  const [showAlertas, setShowAlertas] = useState(false);

  const toggleSection = (section: string) => {
    if (section === "estacoes") setShowEstacoes(!showEstacoes);
    if (section === "parametros") setShowParametros(!showParametros);
    if (section === "sensores") setShowSensores(!showSensores);
    if (section === "alertas") setShowAlertas(!showAlertas);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        minWidth: "845px",
        margin: 0,
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          backgroundColor: "#364d6f",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Manual do Usuário</h1>
        <p>Encontre respostas e orientações sobre o uso do sistema.</p>
      </header>

      {/* Conteúdo Principal */}
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
        {/* Perguntas Frequentes */}

        {/* Seção Estações */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("estacoes")}
          >
            Estação
          </h2>
          <div
            style={{
              maxHeight: showEstacoes ? "500px" : "0", // Controla a altura
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out", // Transição suave
              marginTop: "15px",
            }}
          >
            {showEstacoes && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como cadastrar uma estação?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Acesse o menu &quot;Estação&quot; e clique em &quot;Adicionar&quot;. Preencha os campos obrigatórios e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar as estações cadastradas?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Estação&quot; e veja a lista completa das estações cadastradas.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar uma estação?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Clique no ícone de edição ao lado da estação desejada, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir uma estação?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Selecione a estação, clique no ícone de exclusão e confirme a operação.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Parâmetros */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("parametros")}
          >
            Parâmetro
          </h2>
          <div
            style={{
              maxHeight: showParametros ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showParametros && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como cadastrar um parâmetro?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Acesse o menu &quot;Parâmetros&quot; e clique em &quot;Adicionar&quot;. Preencha os campos necessários e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar os parâmetros cadastrados?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Parâmetros&quot; e veja a lista completa dos parâmetros cadastrados.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar um parâmetro?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Clique no ícone de edição ao lado do parâmetro desejado, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir um parâmetro?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Selecione o parâmetro, clique no ícone de exclusão e confirme a operação.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Sensores */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("sensores")}
          >
            Sensor
          </h2>
          <div
            style={{
              maxHeight: showSensores ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showSensores && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como cadastrar um sensor?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Acesse o menu &quot;Sensores&quot; e clique em &quot;Adicionar&quot;. Preencha os campos necessários e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar os sensores cadastrados?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Sensores&quot; e veja a lista completa dos sensores cadastrados.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar um sensor?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Clique no ícone de edição ao lado do sensor desejado, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir um sensor?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Selecione o sensor, clique no ícone de exclusão e confirme a operação.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Alertas */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("alertas")}
          >
            Alerta
          </h2>
          <div
            style={{
              maxHeight: showAlertas ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showAlertas && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como configurar alertas?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Acesse o menu &quot;Alertas&quot; e configure os parâmetros desejados para os alertas.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ManualUsuario;
