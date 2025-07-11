import {JSX} from 'react';
import NavBar     from '../Componenti/Comuni/NavBar';
import Background from '../Componenti/Comuni/Background';
import FormSpecie from '../Componenti/Schermate/Specie/FormSpecie';

export default function (): JSX.Element {
    return (
          <Background>
            <NavBar/>
             <FormSpecie/>
          </Background>

    );
}