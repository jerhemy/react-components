import './App.css'

import DataGridDemo from './components/DataGridDemo'
import GlobalSearchDemo from './components/GlobalSearchDemo'
import JsonTreeViewerDemo from './components/JsonTreeViewerDemo'
import RouteTrackerDemo from './components/RouteTrackerDemo'
import SchedulerDemo from './components/SchedulerDemo'
import SelectDemo from './components/SelectDemo'

function App() {
  return (
    <div className="app-container">
      <SchedulerDemo />
      <JsonTreeViewerDemo />
      <GlobalSearchDemo />
      <RouteTrackerDemo />
      <DataGridDemo />
      <SelectDemo />
    </div>
  )
}

export default App
