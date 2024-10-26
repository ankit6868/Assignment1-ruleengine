import React, { useState } from 'react';
import { useRuleStore } from '../store/ruleStore';
import { UserData } from '../types/ast';
import { CheckCircle, XCircle } from 'lucide-react';

export function UserDataForm() {
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    department: '',
    salary: 0,
    experience: 0,
  });

  const [results, setResults] = useState<{ ruleId: string; result: boolean }[]>([]);
  const { rules, evaluateRules } = useRuleStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluationResults = evaluateRules(userData);
    setResults(evaluationResults);
  };

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: field === 'department' ? value : Number(value),
    }));
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={userData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Department
            </label>
            <input
              type="text"
              id="department"
              value={userData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={userData.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Experience (years)
            </label>
            <input
              type="number"
              id="experience"
              value={userData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Evaluate Rules
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Evaluation Results</h3>
          <div className="space-y-2">
            {results.map(({ ruleId, result }) => {
              const rule = rules.find((r) => r.id === ruleId);
              return (
                <div
                  key={ruleId}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {rule?.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {result ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}