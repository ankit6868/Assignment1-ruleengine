import React from 'react';
import { useRuleStore } from '../store/ruleStore';
import { Trash2 } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('json', json);

export function RuleList() {
  const { rules, deleteRule } = useRuleStore();

  if (rules.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        No rules added yet. Create your first rule above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{rule.name}</h3>
            <button
              onClick={() => deleteRule(rule.id)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="p-4">
            <div className="mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Rule Expression:</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{rule.ruleString}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">AST Structure:</h4>
              <div className="mt-1 text-sm">
                <SyntaxHighlighter
                  language="json"
                  style={docco}
                  customStyle={{
                    backgroundColor: 'transparent',
                    padding: '1rem',
                  }}
                >
                  {JSON.stringify(rule.ast, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}