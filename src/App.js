import React, {useRef, useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'; //Estilos poput
import SignaturePad from 'react-signature-pad-wrapper'


const App = () => {

  /*Estados para crear imagen y titulo de firma creada */
  const [imageURL, setImageURL] = useState(null)
  const [state, setState] = useState(false)

  const sigCanvas = useRef({}) //Referencia de la libreria react-signature-pad-wrapper

  const handleClean = () => {
    sigCanvas.current.signaturePad.clear()
    setState(false) //Cierra el mensaje Firma Creada.
  }

  const handleCreate = () => {
    setImageURL(sigCanvas.current.toDataURL())
    setState(true) //Abre el mensaje Firma Creada.
  }

  return (
    <div className='container'>
      <div className='box-signature'>

        <h1 className='title'>Firma de Documentos</h1>
        <p>Esta es una herramienta para firmar un documentos.</p>

        <Popup modal trigger={<button className='btn-primary'>Firmar</button>}>
          {close => (
            <>
            {
              state && (
              <div className='title-create-signature'>
                <p>Firma Creada.</p>
                <p onClick={close} className='btn-see'>ver</p>
              </div>)
            }
            
              <SignaturePad 
                ref={sigCanvas}
                options={{minWidth: 1, maxWidth: 5, penColor: '#292828'}} 
              />
              <div className='box-button'>
                <button className='btn' onClick={close}>Cerrar</button>
                <button className='btn' onClick={handleClean}>Limpiar</button>
                <button className='btn-create' onClick={handleCreate}>Crear</button>
              </div>
            </>
          )}
        </Popup>

        <br/>
        <br/>
        <br/>

        {
          imageURL && (
            <img 
              className='sign'
              src={imageURL} 
              alt="imageURL" 
            />
          ) 
        }

      </div>
    </div>
  )
}

export default App