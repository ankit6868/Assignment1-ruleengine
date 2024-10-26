import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { RuleForm } from './components/RuleForm';
import { RuleList } from './components/RuleList';
import { UserDataForm } from './components/UserDataForm';
import { useRuleStore } from './store/ruleStore';

function App() {
  const { darkMode, toggleDarkMode } = useRuleStore();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rule Engine AST</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Rule</h2>
              <RuleForm />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Rule List</h2>
              <RuleList />
            </section>
          </div>

          <div>
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Evaluate User Data</h2>
              <UserDataForm />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;