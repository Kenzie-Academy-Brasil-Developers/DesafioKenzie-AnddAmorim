import { Toaster } from 'react-hot-toast';
import { Homepage } from './components/Homepage/index';

const App = () => (
  <>
  <Homepage />
  <Toaster
    position='top-right'
    reverseOrder={false} />
  </>
)

export default App
