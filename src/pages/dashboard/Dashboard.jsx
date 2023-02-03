//  styles
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import './Dashboard.css';

const Dashboard = () => {

  const {documents} = useCollection('projects')

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {documents && <ProjectList projects={documents } />}
    </div>
  )
}

export default Dashboard