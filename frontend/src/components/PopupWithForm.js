import {useEffect} from "react";

function PopupWithForm ({name, title, submitButton, children, isOpen, onClose, onCloseEsc, onCloseOverlay, onSubmit, isLoading, submitBtnLoading, }) {

    useEffect(()=>{
        if(isOpen) {
            document.addEventListener('keydown', onCloseEsc);
            document.addEventListener('mousedown', onCloseOverlay);
        } else {
            document.removeEventListener('keydown', onCloseEsc);
            document.removeEventListener('mousedown', onCloseOverlay);
        }
    }, [isOpen])
    
    return(
        <section className={`popup popup${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <form className="popup__content" name={name} onSubmit={onSubmit}>
                    <h2 className="popup__heading">{title}</h2>
                        {children}
                    <button type="submit" className="popup__save-button">{isLoading ? submitBtnLoading : submitButton}</button>
                </form>
                <button type="button" className="popup__close-button popupEdit__close-button" onClick={onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithForm;