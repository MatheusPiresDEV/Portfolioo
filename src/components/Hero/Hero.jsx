import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const totalCourseHours = 3200;
  const courseStartDate = new Date("2025-01-23"); // início correto
  const periods = 9;
  const currentDate = new Date();

  const weeklyHoursByPeriod = [12, ...Array(7).fill(15), 12];
  const monthlyHoursByPeriod = weeklyHoursByPeriod.map(h => h * 4);
  const semesterHoursByPeriod = monthlyHoursByPeriod.map(h => h * 6);
  const totalHoursWithModel = semesterHoursByPeriod.reduce((acc, h) => acc + h, 0);
  const extraHours = totalCourseHours - totalHoursWithModel;
  const extraWeeks = Math.ceil(extraHours / 15);

  const estimatedGraduationDate = new Date(courseStartDate);
  estimatedGraduationDate.setMonth(courseStartDate.getMonth() + periods * 6);
  if (extraWeeks > 0) {
    estimatedGraduationDate.setDate(estimatedGraduationDate.getDate() + extraWeeks * 7);
  }

  const [tempoRestante, setTempoRestante] = useState({
    anos: 0,
    meses: 0,
    minutos: 0,
    segundos: 0
  });

  useEffect(() => {
    const atualizarContagem = () => {
      const agora = new Date();
      const diffMs = estimatedGraduationDate - agora;
      const totalSeconds = Math.floor(diffMs / 1000);
      const minutos = Math.floor((totalSeconds % 3600) / 60);
      const segundos = totalSeconds % 60;
      const totalDias = Math.floor(totalSeconds / 86400);
      const anos = Math.floor(totalDias / 365);
      const meses = Math.floor((totalDias % 365) / 30);
      setTempoRestante({ anos, meses, minutos, segundos });
    };

    atualizarContagem(); // executa imediatamente
    const interval = setInterval(atualizarContagem, 1000);

    return () => clearInterval(interval);
  }, [estimatedGraduationDate]);

  const diffMeses = Math.floor((currentDate - courseStartDate) / (1000 * 60 * 60 * 24 * 30));
  const currentPeriod = Math.min(Math.floor(diffMeses / 6) + 1, periods);
  const remainingPeriods = periods - currentPeriod;

  const elapsedHours = (() => {
    let total = 0;
    const currentPeriodIndex = Math.floor(diffMeses / 6);
    for (let i = 0; i < currentPeriodIndex; i++) {
      total += semesterHoursByPeriod[i] || 0;
    }
    const currentPeriodStart = new Date(courseStartDate);
    currentPeriodStart.setMonth(courseStartDate.getMonth() + currentPeriodIndex * 6);
    const weeksInCurrentPeriod = Math.floor((currentDate - currentPeriodStart) / (1000 * 60 * 60 * 24 * 7));
    const currentWeeklyHours = weeklyHoursByPeriod[currentPeriodIndex] || 0;
    total += weeksInCurrentPeriod * currentWeeklyHours;
    return Math.min(total, totalCourseHours);
  })();

  const progressPercentage = Math.floor((elapsedHours / totalCourseHours) * 100);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Olá, me chamo Matheus</h1>
        <p className={styles.description}>
          Cursando Engenharia de Software no SENAI, com formação técnica em
          Desenvolvimento de Sistemas pela mesma instituição. Tenho sólida base
          em programação e boas práticas de desenvolvimento adquiridas ao longo
          da formação.
        </p>
        <p className={styles.description}>
          Atualmente no {currentPeriod}º período. Faltam {remainingPeriods} períodos para se formar.<br />
          Previsão realista de formatura: {estimatedGraduationDate.toLocaleDateString("pt-BR")}<br />
          Tempo restante: {tempoRestante.anos} ano(s), {tempoRestante.meses} mês(es), {tempoRestante.minutos} min e {tempoRestante.segundos} segundos<br />
          Carga horária total do curso: {totalCourseHours} horas<br />
          <strong>Progresso do curso:</strong> {progressPercentage}% concluído
        </p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <a href="https://wa.me/5541988314797" className={styles.contactBtn}>
          Entre em contato
        </a>
      </div>
      <div>
        <img
          src={getImageUrl("hero/AboutMe.jpg")}
          alt="Foto minha"
          className={styles.heroImg}
        />
      </div>
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
