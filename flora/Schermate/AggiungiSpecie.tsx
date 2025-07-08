import React from "react";
import FormSpecie from "../Componenti/Schermate/Specie/FormSpecie";
import NavBar from "../Componenti/Comuni/NavBar";
import Titolo from "../Componenti/Comuni/Titolo";
import Background from "../Componenti/Comuni/Background";

export default function AggiungiSpecie() {
    return (
          <Background>
            <NavBar/>
              <Titolo nome="AggiungiSpecie"/>
             <FormSpecie />
          </Background>

    );
}