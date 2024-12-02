import React, { useState } from "react";

const ManualUsuario: React.FC = () => {
  const [showEstacoes, setShowEstacoes] = useState(false);
  const [showParametros, setShowParametros] = useState(false);
  const [showSensores, setShowSensores] = useState(false);
  const [showAlertas, setShowAlertas] = useState(false);
  const [showInstitucional, setShowInstitucional] = useState(false);
  const [showRelatorios, setShowRelatorios] = useState(false);
  const [showUsuario, setShowUsuario] = useState(false);

  const toggleSection = (section: string) => {
    if (section === "estacoes") setShowEstacoes(!showEstacoes);
    if (section === "parametros") setShowParametros(!showParametros);
    if (section === "sensores") setShowSensores(!showSensores);
    if (section === "alertas") setShowAlertas(!showAlertas);
    if (section === "institucional") setShowInstitucional(!showInstitucional);
    if (section === "relatorios") setShowRelatorios(!showRelatorios);
    if (section === "usuario") setShowUsuario(!showUsuario);
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
                    Acesse o menu lateral, clique em &quot;Estação&quot; depois em &quot;Cadastrar&quot;. Preencha os campos obrigatórios e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar as estações cadastradas?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Estação&quot;, depois em &quot;Listar&quot; e veja a lista completa das estações cadastradas.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar uma estação?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Estação&quot;. Clique no ícone de edição ao lado da estação desejada, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir uma estação?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Estação&quot;. Selecione a estação, clique no ícone de exclusão e confirme a operação.
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
                    Acesse o menu &quot;Parâmetros&quot; e clique em &quot;Cadastrar&quot;. Preencha os campos necessários e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar os parâmetros cadastrados?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Parâmetros&quot;, depois em &quot;Listar&quot; e veja a lista completa dos parâmetros cadastrados.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar um parâmetro?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Parâmetros&quot;, depois em &quot;Listar&quot; e clique no ícone de edição ao lado do parâmetro desejado, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir um parâmetro?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Parâmetros&quot;, depois em &quot;Listar&quot;, selecione o parâmetro, clique no ícone de exclusão e confirme a operação.
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
                    Acesse o menu &quot;Sensores&quot; e clique em &quot;Cadastrar&quot;. Preencha os campos necessários e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar os sensores cadastrados?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Sensores&quot;, depois em &quot;Listar&quot; e veja a lista completa dos sensores cadastrados.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar um sensor?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Sensores&quot;, depois em &quot;Listar&quot; e clique no ícone de edição ao lado do sensor desejado, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir um sensor?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Sensores&quot;, depois em &quot;Listar&quot;, selecione o sensor, clique no ícone de exclusão e confirme a operação.
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
                    Acesse o menu &quot;Alertas&quot;, clique em &quot;Sensores&quot;. Preencha os campos necessários e clique em &quot;Salvar&quot;.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar os sensores cadastrados?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Sensores&quot;, depois em &quot;Listar&quot; e veja a lista completa dos sensores cadastrados.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como editar um alerta?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Alertas&quot;, depois em &quot;Listar&quot; e clique no ícone de edição ao lado do alerta desejado, faça as alterações e salve.
                  </p>
                </article>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como excluir um alerta?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                  No menu lateral, clique em &quot;Alertas&quot;, depois em &quot;Listar&quot;, selecione o alerta, clique no ícone de exclusão e confirme a operação.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Institucional */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("institucional")}
          >
            Institucional
          </h2>
          <div
            style={{
              maxHeight: showInstitucional ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showInstitucional && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como acessar o conteúdo institucional?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, em &quot;Institucional&quot; selecione entre os conteúdos institucionais das estações, parâmetros e sensores para saber mais sobre o funcionamento de cada um destes assuntos.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Relatórios */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("relatorios")}
          >
            Relatórios
          </h2>
          <div
            style={{
              maxHeight: showRelatorios ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showRelatorios && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como visualizar relatórios?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    No menu lateral, clique em &quot;Relatório&quot; e depois em &quot;Visualizar Relatórios&quot; para acessar os relatórios. Nesta página você pode selecionar através dos filtro de data o período desejado para gerar o relatório correspondente ao período desejado. <br></br>
                    Também é possível selecionar quais estações você deseja incluir no relatório para obter informações específicas sobre elas. Além disso, é possível selecionar o tipo de relatório que deseja gerar entre as opções: &quot;Geral&quot;, &quot;Quantidade Média de Alertas por estação&quot;, &quot;Média de Medição por Sensor&quot; e &quot;Quantidade de Ocorrências por Alerta&quot;.
                  </p>
                </article>
              </div>
            )}
          </div>
        </section>

        {/* Seção Usuário */}
        <section style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#364d6f",
              borderBottom: "2px solid #364d6f",
              cursor: "pointer",
            }}
            onClick={() => toggleSection("usuario")}
          >
            Usuário
          </h2>
          <div
            style={{
              maxHeight: showUsuario ? "500px" : "0",
              overflow: "hidden",
              transition: "max-height 0.5s ease-in-out",
              marginTop: "15px",
            }}
          >
            {showUsuario && (
              <div>
                <article style={{ marginBottom: "15px" }}>
                  <h3 style={{ color: "#364d6f", fontSize: "1.2em" }}>
                    Como acessar e editar meu perfil?
                  </h3>
                  <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Na parte inferior do menu lateral, clique nos três pontinhos verticais e selecione &quot;Meu Perfil&quot; para acessar e &quot;Editar&quot; editar suas informações, ou &quot;Excluir&quot; para excluir sua conta. Caso deseje sair do sistema, clique em &quot;Sair&quot; para fazer o logout.
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
