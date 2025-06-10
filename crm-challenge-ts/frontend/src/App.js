import './App.css';
import CustomerTable from './customerTable';
import CustomerForm from './customerForm';
import { useCustomers } from './hooks/useCustomers';
import TssForm from './tssForm';

function App() {
  const { customers, error, loading, fetchCustomers } = useCustomers();

  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          <div className="form-column">
            <h2>Add New Customer</h2>
            <CustomerForm onSuccess={fetchCustomers} />
          </div>
          <div className="form-column">
            <h2>Create New TSS</h2>
            <TssForm onTssCreated={fetchCustomers} />
          </div>
        </div>
        <CustomerTable 
          customers={customers}
          error={error}
          loading={loading}
        />
      </header>
    </div>
  );
}

export default App;
