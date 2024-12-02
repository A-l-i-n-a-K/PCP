import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Survey.css";
import yes from '../../../svg/yes.svg';

const Survey = () => {
  const questions = [
    "Я чувствую себя полным энергии перед каждой тренировкой.",
    "Я легко справляюсь со стрессом, вызванным соревнованиями или тренировками.",
    "Я мотивирован на достижение высоких результатов в спорте.",
    "Я ощущаю удовлетворение от своих спортивных достижений.",
    "Я чувствую себя уверенно в своих силах на тренировках и соревнованиях.",
    "Я быстро восстанавливаюсь после интенсивных тренировок или неудач.",
    "Я способен поддерживать высокую концентрацию во время тренировок и соревнований.",
    "Я ощущаю эмоциональную стабильность в течение тренировочного процесса.",
    "Я положительно реагирую на конструктивную критику и использую её для улучшения своих результатов.",
    "Я чувствую себя эмоционально уравновешенным после соревнований, независимо от результата.",
    "Я ощущаю себя мотивированным даже во время трудных периодов в спортивной карьере.",
    "Я уверен в своей способности достигать долгосрочные цели.",
    "Я испытываю радость и удовлетворение от процесса тренировок.",
    "Я чувствую себя частью команды и получаю поддержку от своих товарищей.",
    "Я положительно отношусь к своим тренировкам и стремлюсь к их улучшению.",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (Object.keys(answers).length === questions.length) {
        setShowModal(true);
      } else {
        setShowIncompleteModal(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/psychologyTest');
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const getRecommendations = (score) => {
    if (score >= 60) {
      return "Прекрасное состояние. Вы показываете высокую мотивацию, эмоциональную устойчивость и уверенность в своих силах. Продолжайте в том же духе, поддерживайте свой уровень энергии и позитивное отношение к тренировкам.";
    } else if (score >= 45) {
      return "Хорошее состояние. У вас есть небольшие области для улучшения, но в целом вы демонстрируете положительное отношение к спорту и готовы к достижению высоких результатов. Обратите внимание на моменты, которые вызывают беспокойство, и работайте над ними.";
    } else if (score >= 30) {
      return "Удовлетворительное состояние. Возможно, вам не хватает энергии или мотивации на тренировках. Постарайтесь проанализировать, что именно вас беспокоит, и найдите способы улучшить эмоциональное состояние и устойчивость.";
    } else {
      return "Плохое состояние. Вам стоит уделить внимание своему эмоциональному и психологическому состоянию. Обратитесь к тренеру или психологу за поддержкой, работайте над улучшением мотивации и уверенности в своих силах.";
    }
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  return (
    <div className="survey-container">
      <h1>{currentQuestion + 1}. {questions[currentQuestion]}</h1>
      <form>
        {[1, 2, 3, 4, 5].map((option) => (
          <div key={option} className="survey-radio-option">
            <input
              type="radio"
              id={`q${currentQuestion}_a${option}`}
              name={`question_${currentQuestion}`}
              value={option}
              checked={answers[currentQuestion] === option}
              onChange={() => handleAnswerChange(option)}
            />
            <label htmlFor={`q${currentQuestion}_a${option}`}>{option}</label>
          </div>
        ))}
      </form>
      <div className="survey-navigation-buttons">
        <button onClick={handlePrev}>
          ← Назад
        </button>
        <button
          onClick={handleNext}
        >
          Вперед →
        </button>
      </div>
      {showModal && (
        <div className="resultModal">
          <div className="resultModal-content">
            <h2>Поздравляем вас с прохождением теста!</h2>
            <p>Ваш результат: {totalScore} / 75.</p>
            <p>{getRecommendations(totalScore)}</p>
            <img className="resultModal-close" src={yes} alt="да" onClick={() => {setShowModal(false); navigate('/psychologyTest')}}/>
          </div>
        </div>
      )}
      {showIncompleteModal && (
        <div className="resultModal">
          <div className="resultModal-content">
            <p>Пожалуйста, ответьте на все вопросы перед завершением теста.</p>
            <img className="resultModal-close" src={yes} alt="да" onClick={() => {
              setShowIncompleteModal(false);
              setCurrentQuestion(questions.findIndex((_, index) => !(index in answers)));
            }}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
