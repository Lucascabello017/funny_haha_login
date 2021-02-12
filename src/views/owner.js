import React from 'react';
import './owner.css'

function Owner({returnToLogin}) {

    let [owned, setOwned] = React.useState(false);
    let [chosen, setChosen] = React.useState(false);

    let yes = () => {
        setChosen(true);
        setOwned(true);
    }

    let no = () => {
        setChosen(true);
        setOwned(false);
    }

    return (
        <div>
            <div>Are you the owner of the account?</div>
            <div>
                <button onClick={yes} className="yes">Yes</button>
                <button onClick={no} className="no">No</button>
            </div>

            {chosen &&
                <div> 
                {owned && 
                    <div className="good">
                        Good!
                    </div>
                }

                {!owned && 
                    <div className="Error">
                        Uh oh!
                    </div>
                }
                </div>
            }

            <div>
                <button onClick={() => returnToLogin()}>Return to Login</button>
            </div>
        </div>
    );
}

export default Owner;