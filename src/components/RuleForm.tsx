import React, { useState } from 'react';
import { useRuleStore } from '../store/ruleStore';
import { AlertCircle } from 'lucide-react';

export function RuleForm() {
  const [name, setName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [error, setError] = useState<string | null>(null);
  const addRule = useRuleStore((state) => state.addRule);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      addRule(name, ruleString);
      setName('');
      setRuleString('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid rule format');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Rule Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="rule" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Rule Expression
        </label>
        <textarea
          id="rule"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={4}
          required
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Add Rule
      </button>
    </form>
  );
}