import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const About = () => {
  const defaultObjetivos = [
    { nome: "Me formar em Técnico em Desenvolvimento de Sistemas", status: "concluido" },
    { nome: "Me formar em Engenharia de Software", status: "andamento" },
    { nome: "Fazer uma Pós em Arquitetura de Software, Ciência de Dados e Cybersecurity", status: "pendente" }
  ];

  const [objetivos, setObjetivos] = useState(defaultObjetivos);

  useEffect(() => {
    const stored = localStorage.getItem("objetivos");
    if (stored) setObjetivos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
  }, [objetivos]);

  const handleStatusChange = (index) => {
    const escolha = prompt(
      "Escolha o novo status para o objetivo:\n1 - Concluído ✅\n2 - Em andamento ⏳\n3 - Pendente ❌"
    );
    const senha = prompt("Digite a senha para confirmar:");
    if (senha !== "mathe0us") {
      alert("Senha incorreta!");
      return;
    }

    const atualizados = [...objetivos];
    switch (escolha) {
      case "1":
        atualizados[index].status = "concluido";
        break;
      case "2":
        atualizados[index].status = "andamento";
        break;
      case "3":
        atualizados[index].status = "pendente";
        break;
      default:
        alert("Opção inválida.");
        return;
    }
    setObjetivos(atualizados);
  };

  const getIcon = (status) => {
    if (status === "concluido") return "✅";
    if (status === "andamento") return "⏳";
    return "❌";
  };

  const total = objetivos.length;
  const completos = objetivos.filter(o => o.status === "concluido").length;
  const andamento = objetivos.filter(o => o.status === "andamento").length;
  const pendentes = objetivos.filter(o => o.status === "pendente").length;

  const porcentagem = ((completos + andamento * 0.5) / total) * 100;

  const pieData = {
    labels: ["Concluído", "Em andamento", "Pendente"],
    datasets: [
      {
        data: [completos, andamento, pendentes],
        backgroundColor: ["green", "gold", "lightgray"],
        borderWidth: 1
      }
    ]
  };

  return (
    <section className={styles.container} id="sobre">
      <h2 className={styles.title}>Sobre</h2>
      <div className={styles.content}>
        <div className={styles.goalsContainer}>
          <h3>Meus objetivos profissionais</h3>
          <ul className={styles.goalsList}>
            {objetivos.map((item, index) => (
              <li key={index} className={styles.goalItem}>
                <button
                  className={styles.statusButton}
                  onClick={() => handleStatusChange(index)}
                >
                  {getIcon(item.status)}
                </button>
                <span className={styles.goalText}>{item.nome}</span>
              </li>
            ))}
          </ul>
          <div className={styles.progressBar}>
            <div className={styles.fill} style={{ width: `${porcentagem}%` }} />
          </div>
          <div className={styles.chartContainer}>
            <h4>Progresso geral: {porcentagem.toFixed(0)}%</h4>
            <Pie data={pieData} />
          </div>
        </div>

        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Ícone de servidor" />
            <div className={styles.aboutItemText}>
              <h3>Desenvolvedor Back-End</h3>
              <p>Experiência em desenvolvimento backend, com foco na criação de sistemas robustos e eficientes.</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Ícone de cursor" />
            <div className={styles.aboutItemText}>
              <h3>Desenvolvedor Front-End</h3>
              <p>Experiência em desenvolvimento front-end, especializado na criação de sites responsivos e otimizados.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
