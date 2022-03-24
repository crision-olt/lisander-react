import React from "react";
import {SignInForm, SignUpForm} from "../../components";
import atlas from "../../assets/png/atlas.png";

export default function SignInSignUp(props) {
    const {setRefreshCheckLogin} = props;

    return (
        <>
            <div className="bg-white h-screen flex flex-col">
                <div className="grid grid-flow-col sm:grid-cols-1 md:grid-cols-2">
                    <LeftComponent/>
                    <RightComponent
                        setRefreshCheckLogin={setRefreshCheckLogin}
                    />
                </div>
            </div>
        </>
    );
}

function LeftComponent() {
    return (
        <div className="bg-green-700 h-screen hidden md:flex justify-center items-center">
            <div>
                <img src={atlas} alt="" width={400}/>
            </div>

            {/*<div>
                <h2>
                    <FontAwesomeIcon icon={faSearch}/> Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers}/> Enterate de que esta hablando la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment}/> Unete a la conversacion.
                </h2>
            </div>*/}
        </div>
    );
}

function RightComponent(props) {
    const {setRefreshCheckLogin} = props;
    return (
        <div className="bg-yellow-400 h-screen flex justify-center items-center p-6">
            <div>
                <div className="flex md:hidden">
                    <img src={atlas} alt="" width={200}/>
                </div>
                <h2 className="text-4xl">
                    Mira lo que esta pasando en el mundo en este momento
                </h2>
                <h3 className="text-3xl"> Unete a Lisander hoy mismo</h3>
                <div className="justify-evenly m-4 flex">
                    <SignUpForm/>
                    <SignInForm setRefreshCheckLogin={setRefreshCheckLogin}/>
                </div>
            </div>
        </div>
    );
}
