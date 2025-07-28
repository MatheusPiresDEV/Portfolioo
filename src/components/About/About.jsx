import React from "react";
import styles from "./About.module.css"; // Importa os estilos CSS do módulo
import { getImageUrl } from "../../utils"; // Importa a função utilitária para obter URLs de imagens

// Define o componente funcional `About`
export const About = () => {
  return (
    // Define uma seção HTML com a classe container e o ID 'sobre'
    <section className={styles.container} id="sobre">
      {/* Título da seção */}
      <h2 className={styles.title}>Sobre</h2>
      {/* Conteúdo da seção */}
      <div className={styles.content}>
        {/* Imagem sobre mim */}
        <img
          src={getImageUrl("about/AboutMe.jpg")}
          alt="Uma foto minha"
          className={styles.aboutImage}
        />
        {/* Lista de itens sobre mim */}
        <ul className={styles.aboutItems}>
          {/* Item sobre Desenvolvimento Backend */}
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Ícone de servidor" />
            <div className={styles.aboutItemText}>
              <h3>Desenvolvedor Back-End</h3>
              <p>
                Experiência em desenvolvimento backend, com foco na criação de sistemas robustos e eficientes.
              </p>
            </div>
          </li>
          {/* Item sobre Desenvolvimento Front-End */}
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Ícone de cursor" />
            <div className={styles.aboutItemText}>
              <h3>Desenvolvedor Front-End</h3>
              <p>
                Experiência em desenvolvimento front-end, especializado na criação de sites responsivos e otimizados.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
