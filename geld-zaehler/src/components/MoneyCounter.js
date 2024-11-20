import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const MoneyCounter = () => {
  const [counts, setCounts] = useState({
    '500euro': 0,
    '200euro': 0,
    '100euro': 0,
    '50euro': 0,
    '20euro': 0,
    '10euro': 0,
    '5euro': 0,
    '2euro': 0,
    '1euro': 0,
    '50cent': 0,
    '20cent': 0,
    '10cent': 0,
    '5cent': 0,
    '2cent': 0,
    '1cent': 0
  });

  const values = {
    '500euro': 500,
    '200euro': 200,
    '100euro': 100,
    '50euro': 50,
    '20euro': 20,
    '10euro': 10,
    '5euro': 5,
    '2euro': 2,
    '1euro': 1,
    '50cent': 0.5,
    '20cent': 0.2,
    '10cent': 0.1,
    '5cent': 0.05,
    '2cent': 0.02,
    '1cent': 0.01
  };

  const labels = {
    '500euro': '500€',
    '200euro': '200€',
    '100euro': '100€',
    '50euro': '50€',
    '20euro': '20€',
    '10euro': '10€',
    '5euro': '5€',
    '2euro': '2€',
    '1euro': '1€',
    '50cent': '50¢',
    '20cent': '20¢',
    '10cent': '10¢',
    '5cent': '5¢',
    '2cent': '2¢',
    '1cent': '1¢'
  };

  const handleChange = (denomination, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setCounts(prev => ({
      ...prev,
      [denomination]: newValue
    }));
  };

  const calculateTotal = () => {
    return Object.entries(counts).reduce((total, [denom, count]) => {
      return total + (values[denom] * count);
    }, 0).toFixed(2);
  };

  const resetCounts = () => {
    setCounts(Object.fromEntries(
      Object.keys(counts).map(key => [key, 0])
    ));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Geldzähler</h1>
        <button 
          onClick={resetCounts}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Zurücksetzen"
        >
          <RefreshCw className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(counts).map((denomination) => (
            <div key={denomination} className="flex items-center space-x-2">
              <label className="w-16 text-gray-700">{labels[denomination]}</label>
              <input
                type="number"
                min="0"
                value={counts[denomination]}
                onChange={(e) => handleChange(denomination, e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-xl font-bold text-center">
            Gesamt: {calculateTotal()}€
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyCounter;