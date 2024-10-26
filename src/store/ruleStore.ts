import { create } from 'zustand';
import { ASTParser } from '../utils/astParser';
import { Rule, UserData } from '../types/ast';
import { RuleEvaluator } from '../utils/evaluator';

interface RuleStore {
  rules: Rule[];
  darkMode: boolean;
  addRule: (name: string, ruleString: string) => void;
  deleteRule: (id: string) => void;
  toggleDarkMode: () => void;
  evaluateRules: (userData: UserData) => { ruleId: string; result: boolean }[];
}

const parser = new ASTParser();
const evaluator = new RuleEvaluator();

export const useRuleStore = create<RuleStore>((set, get) => ({
  rules: [],
  darkMode: false,
  addRule: (name, ruleString) => {
    const ast = parser.parse(ruleString);
    set((state) => ({
      rules: [
        ...state.rules,
        {
          id: crypto.randomUUID(),
          name,
          ruleString,
          ast,
        },
      ],
    }));
  },
  deleteRule: (id) => {
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== id),
    }));
  },
  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }));
  },
  evaluateRules: (userData) => {
    const { rules } = get();
    return rules.map((rule) => ({
      ruleId: rule.id,
      result: evaluator.evaluate(rule.ast, userData),
    }));
  },
}));