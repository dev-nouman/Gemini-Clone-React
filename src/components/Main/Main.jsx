import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import ReactMarkdown from 'react-markdown'

const Main = () => {
    // Pull everything from the global State
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user icon" />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hi there!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => setInput("What are some essential tips for packing light on an international trip?")}>
                                <p>What are some essential tips for packing light on an international trip?</p>
                                <img src={assets.compass_icon} alt="compass icon" />
                            </div>
                            <div className="card" onClick={() => setInput("Explain the core differences between frontend and backend web development.")}>
                                <p>Explain the core differences between frontend and backend web development.</p>
                                <img src={assets.code_icon} alt="code icon" />
                            </div>
                            <div className="card" onClick={() => setInput("Suggest effective time management techniques for university students.")}>
                                <p>Suggest effective time management techniques for university students.</p>
                                <img src={assets.bulb_icon} alt="bulb icon" />
                            </div>
                            <div className="card" onClick={() => setInput("Summarize the history and evolution of the internet in simple terms.")}>
                                <p>Summarize the history and evolution of the internet in simple terms.</p>
                                <img src={assets.message_icon} alt="message icon" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            {loading ? (
                                <div className="loader">
                                    <hr className="animated-bg" />
                                    <hr className="animated-bg" />
                                    <hr className="animated-bg" />
                                </div>
                            ) : (
                                <div>
                                    <ReactMarkdown>{resultData}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter Prompt here'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input) {
                                    onSent();
                                }
                            }}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="gallery pic" />
                            <img src={assets.mic_icon} alt="mic pic" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="send pic" style={{ cursor: 'pointer' }} /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">Gemini is AI and can make mistakes.</p>
                </div>
            </div>
        </div>
    )
}

export default Main