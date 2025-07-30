import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const totalCourseHours = 3200;
  const courseStartDate = new Date("2025-01-23");
  const periods = 9;
  const currentDate = new Date(); // Simulação futuraa

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

  const cursoFinalizado = currentDate >= estimatedGraduationDate;
  const fogosAtivos = cursoFinalizado && currentDate.getFullYear() - estimatedGraduationDate.getFullYear() < 3;

  const [tempoRestante, setTempoRestante] = useState({
    anos: 0,
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  useEffect(() => {
    const atualizarContagem = () => {
      const agora = currentDate;
      const diffMs = estimatedGraduationDate - agora;
      const totalSeconds = diffMs / 1000;

      const anos = Math.floor(totalSeconds / (365 * 24 * 3600));
      const restoAno = totalSeconds % (365 * 24 * 3600);
      const meses = Math.floor(restoAno / (30 * 24 * 3600));
      const restoMes = restoAno % (30 * 24 * 3600);
      const diasDecimal = restoMes / (24 * 3600);
      const diasComDecimais = diasDecimal.toFixed(1);
      const horasDecimal = (diasDecimal - Math.floor(diasDecimal)) * 24;
      const horas = Math.floor(horasDecimal);
      const minutosDecimal = (horasDecimal - horas) * 60;
      const minutos = Math.floor(minutosDecimal);
      const segundos = Math.floor((minutosDecimal - minutos) * 60);

      setTempoRestante({
        anos,
        meses,
        dias: diasComDecimais,
        horas,
        minutos,
        segundos
      });
    };

    atualizarContagem();
    const interval = setInterval(atualizarContagem, 1000);
    return () => clearInterval(interval);
  }, [estimatedGraduationDate]);

  const diffMeses = Math.floor((currentDate - courseStartDate) / (1000 * 60 * 60 * 24 * 30));
  const currentPeriod = Math.min(Math.floor(diffMeses / 6) + 1, periods);
  const remainingPeriods = periods - currentPeriod;

  const elapsedHours = cursoFinalizado
    ? totalCourseHours
    : (() => {
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

  const remainingHours = cursoFinalizado ? 0 : totalCourseHours - elapsedHours;
  const progressPercentage = cursoFinalizado ? 100 : Math.floor((elapsedHours / totalCourseHours) * 100);
  const tempoColor = progressPercentage < 50 ? styles.alertText : styles.normalText;

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Matheus, técnico em Desenvolvimento de Sistemas</h1>

        <p className={styles.description}>
          Formado em Engenharia de Software pela UniSenai - PR, com formação técnica em
          Desenvolvimento de Sistemas pelo Senai. Tenho sólida base
          em programação e boas práticas de desenvolvimento adquiridas ao longo
          da formação.
        </p>

        <p className={`${styles.description} ${tempoColor} ${styles.timeRemaining}`}>
          {cursoFinalizado ? (
            <div className={styles.graduadoWrapper}>
              {fogosAtivos && (
                <div className={styles.fireworks}>
                  {[...Array(6)].map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>
              )}
              <p className={styles.graduadoTexto}>
                Curso finalizado! 🎓<br />
                Formado em Engenharia de Software
              </p>
            </div>
          ) : (
            <>
              Atualmente no {currentPeriod}º período. Faltam {remainingPeriods} períodos para se formar.<br />
              Previsão de formatura: {estimatedGraduationDate.toLocaleDateString("pt-BR")}<br />
              Tempo restante: {tempoRestante.anos} ano(s), {tempoRestante.meses} mês(es), {tempoRestante.dias} dia(s), {tempoRestante.horas}h {tempoRestante.minutos}min {tempoRestante.segundos}s<br />
            </>
          )}
          Carga horária total do curso: {totalCourseHours} horas ({remainingHours} restantes)<br />
          <strong>Progresso do curso:</strong> {progressPercentage}% concluído
        </p>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
        </div>

        <a href="https://wa.me/5541988314797" className={styles.contactBtn}>
          Entre em contato
        </a>
      </div>

      <div>
        <img
          src={getImageUrl("hero/eu.jpg")}
          alt="Foto minha"
          className={styles.heroImg}
        />
      </div>

      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
