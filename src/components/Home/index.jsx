import './index.css'
import {Route,withRouter} from 'react-router-dom'
import TaskCenter from '../../pages/TaskCenter'
import Intergrate from '../../pages/Integrate'

function Home(props) {

    function pushTaskCenter(){
        props.history.push('/taskcenter')
    }

    function pushIntegrate(){
        props.history.push('/integrate')
    }
    
    return (
        <div>
            <div className='center'>
                <div className='left' onClick={pushTaskCenter}></div>
                <div className='right' onClick={pushIntegrate}></div>
            </div>
            <Route path="/taskcenter" component={TaskCenter} />
            <Route path="/integrate" component={Intergrate} />
        </div>
    )
}



export default withRouter(Home)