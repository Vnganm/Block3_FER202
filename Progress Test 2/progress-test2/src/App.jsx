import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="content-wrapper">
        <AppRoutes />
      </div>
      {/* Thêm footer tạm để kiểm tra */}
      <footer className="text-center py-1 bg-light mt-auto">
        <p>Footer - © 2025 Mobile Shop</p>
      </footer>
    </div>
  );
}

export default App;