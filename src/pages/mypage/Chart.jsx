import { eachDayOfInterval, isSameDay, getDay, format } from "date-fns";
import styles from "./Chart.module.scss";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerTitleState } from "../../state/headerTitleState";
import { useEffect } from "react";

const Calendar = ({ startDate, endDate, studyData }) => {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(()=>{
    setHeaderTitle("통계")
  }, [setHeaderTitle]);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const [tooltipDate, setTooltipDate] = useState(null); // 말풍선에 표시할 날짜 정보 상태

  const handleMouseEnter = (date) => {
    setTooltipDate(date);
  };
  const handleMouseLeave = () => {
    setTooltipDate(null);
  };

  const Tooltip = ({ date }) => {
    return <div className={styles.tooltip}>{format(date, "yyyy-MM-dd")}</div>;
  };

  const rows = [];
  let currentRow = [];
  days.forEach((day) => {
    const dayOfWeek = getDay(day);
    if (dayOfWeek === 6) {
      // 토요일인 경우
      currentRow.push(day);
      rows.push(currentRow);
      currentRow = [];
    } else {
      currentRow.push(day);
    }
  });
  if (currentRow.length !== 0) {
    rows.push(currentRow);
  }

  const reversedRows = rows.reverse();

  return (
    <div className={styles.calendar}>
      {reversedRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.calendarRow}>
          {row.map((day, columnIndex) => {
            const studyInfo = studyData.find((data) =>
              isSameDay(data.date, day)
            );
            const duration = studyInfo ? studyInfo.duration : 0;
            const color = duration > 0 ? "#c79aff" : "#c2bcca";

            return (
              <div
                key={day.toISOString()}
                className={styles.calendarCell}
                style={{ backgroundColor: color }}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={handleMouseLeave}
              >
                {tooltipDate && isSameDay(day, tooltipDate) && (
                  <Tooltip date={tooltipDate} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Legend = () => {
  return (
    <div className={styles.legendContainer}>
      <div className={styles.level}>
        <div
          className={styles.calendarCell}
          style={{ backgroundColor: "#e4d2fa" }}
        />
        <p>1</p>
      </div>
      <div className={styles.level}>
        <div
          className={styles.calendarCell}
          style={{ backgroundColor: "#c79aff" }}
        />
        <p>2</p>
      </div>
      <div className={styles.level}>
        <div
          className={styles.calendarCell}
          style={{ backgroundColor: "#a256ff" }}
        />
        <p>3</p>
      </div>
      <div className={styles.level}>
        <div
          className={styles.calendarCell}
          style={{ backgroundColor: "#6700e6" }}
        />
        <p>4</p>
      </div>
    </div>
  );
};

const DayOfWeek = () => {
  return (
    <div className={styles.weekLegend}>
      <div style={{ color: "red" }}>S</div>
      <div>M</div>
      <div>T</div>
      <div>W</div>
      <div>T</div>
      <div>F</div>
      <div style={{ color: "blue" }}>S</div>
    </div>
  );
};

const Chart = () => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date();
  const studyData = [
    { date: new Date("2023-01-01"), duration: 2 },
    { date: new Date("2023-01-05"), duration: 1.5 },
    // ...
  ];

  return (
    <div className={styles.container}>
      <Legend />
      <DayOfWeek />
      <Calendar startDate={startDate} endDate={endDate} studyData={studyData} />
    </div>
  );
};

export default Chart;
