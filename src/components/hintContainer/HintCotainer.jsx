import styles from './HintContainer.module.scss'
import {useState} from "react";

const HintContentBox = ({hintContent, isAdmin, isOpen}) => {
    const [hintInputValue, setHintInputValue] = useState(hintContent);
    if (isAdmin) {
        const handleChange = (e) => {
            setHintInputValue(e.target.value);
        }
        return (
            <input className={styles.hintContent}
                   type="text"
                   value={hintInputValue}
                   placeholder={"힌트를 입력해주세요"}
                   onChange={handleChange}
            />
        )
    }
    return (
        <div className={isOpen ? styles.hintContent : styles.blurContent}>
            {hintContent}
        </div>
    )
}

export default function HintContainer({hintTitle, hintContent, isAdmin = false, isOpen = false}) {
    return (
        <div className={styles.hintContainer}>
            <div className={styles.hintName}>
                <div className={styles.hintTitle}>{hintTitle}</div>
                <HintContentBox hintContent={hintContent} isAdmin={isAdmin} isOpen={isOpen}/>
            </div>
            {isAdmin ?
                <svg className={styles.editIcon} width="14" height="18" viewBox="0 0 14 18" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                        fill="#3E3E3E"/>
                </svg>
                : null}
        </div>
    )
}