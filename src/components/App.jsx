import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import styles from './App.module.css';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const leaveFeedback = type => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const countTotalFeedback = () =>
    Object.values(feedback).reduce((acc, value) => acc + value, 0);

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  return (
    <div className={styles.app}>
        <>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(feedback)}
              onLeaveFeedback={leaveFeedback}
            />
          </Section>

          <Section title="Statistics">
            {countTotalFeedback() > 0 ? (
              <Statistics
                good={feedback.good}
                neutral={feedback.neutral}
                bad={feedback.bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </>
    </div>
  );
};

export default App;
