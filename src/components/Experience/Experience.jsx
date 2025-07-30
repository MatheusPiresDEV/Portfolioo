import React, { useState, useEffect } from "react";
import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString("pt-BR");
      const time = now.toLocaleTimeString("pt-BR", { hour12: false });
      const milliseconds = String(now.getMilliseconds()).padStart(3, "0");
      setCurrentDateTime(`${date} ${time}:${milliseconds}`);
    }, 100); // atualiza a cada 100ms
    return () => clearInterval(interval);
  }, []);

  const parseDate = (dateStr) => {
    if (dateStr === "Atual") return new Date(); // usa data atual
    const [mes, ano] = dateStr.split(" de ");
    const meses = {
      Janeiro: 0,
      Fevereiro: 1,
      Março: 2,
      Abril: 3,
      Maio: 4,
      Junho: 5,
      Julho: 6,
      Agosto: 7,
      Setembro: 8,
      Outubro: 9,
      Novembro: 10,
      Dezembro: 11,
    };
    return new Date(ano, meses[mes]);
  };

  return (
    <section className={styles.container} id="linguagens">
      <h2 className={styles.title}>Experiência e linguagens de programação</h2>
      <div className={styles.content}>
        {/* Habilidades */}
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <div key={id} className={styles.skill}>
              <div className={styles.skillImageContainer}>
                <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
              </div>
              <p>{skill.title}</p>
            </div>
          ))}
        </div>

        {/* Histórico ordenado por data */}
        <ul className={styles.history}>
          {[...history]
            .sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
            .map((historyItem, id) => (
              <li key={id} className={styles.historyItem}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>
                    {`${historyItem.startDate} - ${
                      historyItem.endDate === "Atual"
                        ? `Atual - ${currentDateTime}`
                        : historyItem.endDate
                    }`}
                  </p>
                  <ul>
                    {historyItem.experiences.map((experience, idx) => (
                      <li key={idx}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
