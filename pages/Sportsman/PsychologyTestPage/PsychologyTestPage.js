import React from 'react';
import './PsychologyTestPage.css';
import SportsmanSidebar from '../../../components/MenuComponent/SportsmanSidebar';
import IconAndText from '../../../components/PsychologyTestComponent/IconAndText';
import clock from '../../../svg/clock.svg';
import coffee from '../../../svg/coffee.svg';
import flower from '../../../svg/flower.svg';
import diamond from '../../../svg/diamond.svg';
import clipboard from '../../../images/clipboard.png';
import { useNavigate } from 'react-router-dom';

const PsychologyTestPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/survey');
      };

  return (
    <div className="psychologyTestPage-page">
      <SportsmanSidebar />
      <div className='psychologyTestPage-row-all'>
        <div className='psychologyTestPage-mainContent'>
          <p>
            Данный психологический тест поможет вам лучше понять свое <br/>
            эмоциональное состояния, мотивацию и психологическую устойчивость. <br/>
            Анализ результатов позволит вам выявить ваши сильные и слабые стороны, <br/>
            а также разработать стратегии для повышения психологической <br/>
            устойчивости и достижения лучших спортивных результатов.<br/>
            В тесте значение 1-совсем не согласен, а 5-полностью согласен.
          </p>
          <div className='psychologyTestPage-element'>
          <div className='psychologyTestPage-row'>
            <IconAndText title="Тест займет менее 5 минут, содержит 15 вопросов" icon={clock}/>
            <IconAndText title="Результат сразу после заполнения" icon={diamond}/>
          </div>
          <div className='psychologyTestPage-row'>
            <IconAndText title="Отвечай честно" icon={flower}/>
            <IconAndText title="Не торопись" icon={coffee}/>
          </div>
          </div>
          <button className="test-button" onClick={handleClick}>Начать</button>
        </div>
        <img src={clipboard} className="psychologyTestPage-image" alt="clipboard"/>
      </div>
    </div>
  );
};

export default PsychologyTestPage;
