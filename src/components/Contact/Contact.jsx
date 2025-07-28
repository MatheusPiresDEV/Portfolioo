import React from "react"; 
import styles from "./Contact.module.css"; // Importa os estilos CSS do módulo
import { getImageUrl } from "../../utils"; // Importa a função utilitária para obter URLs de imagens

// Define o componente funcional `Contact`
export const Contact = () => {
  return (
    // Define um rodapé HTML com a classe container e o ID 'contato'
    <footer id="contato" className={styles.container}> 
      <div className={styles.text}> 
        {/* Título da seção de contato */}
        <h2>Contato</h2> 
        <p>Aonde você pode me encontrar</p> 
      </div>
      
      {/* Lista de links de contato */}
      <ul className={styles.links}> 
        
        {/* Item de contato por email */}
        <li className={styles.link}> 
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:matheusgustavodasilvapires@gmail.com">
            matheusgustavodasilvapires@gmail.com
          </a>
        </li>
        
        {/* Item de contato pelo LinkedIn */}
        <li className={styles.link}> 
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
          <a href="https://www.linkedin.com/in/matheusgustavopires/">
            https://www.linkedin.com/in/matheusgustavopires/
          </a>
        </li>
        
        {/* Item de contato pelo GitHub */}
        <li className={styles.link}> 
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://github.com/MatheusPiresDEV">
            https://github.com/MatheusPiresDEV
          </a>
        </li>
        
      </ul>
      
    </footer>
  );
};
