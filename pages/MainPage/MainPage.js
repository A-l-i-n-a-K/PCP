import React, { useRef } from 'react';
import './MainPage.css';
import Header from '../../components/MainComponents/Header/Header';
import Footer from '../../components/MainComponents/Footer/Footer';
import Pin from '../../components/MainComponents/Pin/Pin';
import Feature from '../../components/MainComponents/Feature/Feature';
import FeatureBlue from '../../components/MainComponents/FeatureBlue/FeatureBlue';
import logo from '../../images/logo.png';
import analysis from '../../images/analysis.png';
import goals from '../../images/goals.png';
import monitoring from '../../images/monitoring.png';
import training from '../../images/training.png';
import test from '../../images/test.png';
import analysis2 from '../../images/analysis2.png';
import training2 from '../../images/training2.png';
import goals2 from '../../images/goals2.png';
import monitoring2 from '../../images/monitoring2.png';
import test2 from '../../images/test2.png';

function MainPage() {
  const analysisRef = useRef(null);
  const goalsRef = useRef(null);
  const trainingRef = useRef(null);
  const monitoringRef = useRef(null);
  const testRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="main-page">
      <Header />
      <div className="text-with-image"> 
        <div className="text-content"> 
          <p> 
            Откройте&nbsp;для&nbsp;себя&nbsp;новый&nbsp;уровень&nbsp;тренировок&nbsp;с&nbsp;нашим&nbsp;приложением.<br />
            Быстро и удобно отслеживайте свои показатели, получайте <br />
            персонализированные рекомендации и достигайте новых высот в спорте.
          </p>
        </div>
        <div className="image-content">
          <img src={logo} alt="Логотип" />
        </div>
      </div>

      <div className="pins">
        <div onClick={() => scrollToSection(analysisRef)}>
          <Pin title="Анализ данных" icon={analysis} />
        </div>
        <div onClick={() => scrollToSection(goalsRef)}>
          <Pin title="Достижение целей" icon={goals} />
        </div>
        <div onClick={() => scrollToSection(trainingRef)}>
          <Pin title="Тренировки" icon={training} />
        </div>
        <div onClick={() => scrollToSection(monitoringRef)}>
          <Pin title="Мониторинг состояния" icon={monitoring} />
        </div>
        <div onClick={() => scrollToSection(testRef)}>
          <Pin title="Психологический тест" icon={test} />
        </div>
      </div>

      <div className="features">
        <div ref={analysisRef}>
          <Feature 
            title="Анализ данных" 
            text="Функция анализа данных представляет собой инструмент для 
            изучения и понимания физических показателей спортсменов. 
            Она предоставляет возможность отслеживать прогресс, 
            выявлять ключевые тренды и принимать обоснованные решения 
            на основе точных данных." 
            image={analysis2} 
          />
        </div>
        <div ref={goalsRef}>
          <FeatureBlue 
            title="Достижение целей" 
            text="Достижение целей — это ключ к успеху в спорте. 
            Проанализировав данные, тренерам и спортсменам становится 
            легче оценивать возмжности, ставить новые цели и 
            оценивать возможность их достижения." 
            image={goals2} 
          />
        </div>
        <div ref={trainingRef}>
          <Feature 
            title="Тренировки" 
            text="Тренировки — это основа спортивного успеха.
            Анализ данных помогает выявить сильные и слабые стороны, 
            оптимизировать нагрузку и повышать эффективность 
            тренировочного процесса. На основе аналиха вы сможете 
            составить персонализированный план тренировок, включающий
            разнообразные упражнения для развития всех необходимых качеств, 
            а также корректировать его на основе текущих показателей и прогресса." 
            image={training2} 
          />
        </div>
        <div ref={monitoringRef}>
          <FeatureBlue 
            title="Мониторинг" 
            text="Мониторинг является важным аспектом в тренировочном 
            процессе спортсменов. Наше приложение позволяет отслеживать 
            ключевые показатели. Это позволяет спортсменам и тренерам 
            получать детальную картину физической подготовки, 
            своевременно выявлять проблемы и корректировать тренировки 
            для достижения максимальной эффективности. " 
            image={monitoring2}  
          />
        </div>
        <div ref={testRef}>
          <Feature 
            title="Психологический тест" 
            text="Психологические тесты играют важную роль в оценке и 
            улучшении психического состояния спортсменов. Наше приложение 
            включает функцию психологических тестов,которые помогают 
            выявить стрессовые факторы, эмоциональное состояние и мотивацию." 
            image={test2} 
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
