import React from 'react';

// FormFieldProps インターフェースは、FormField コンポーネントが受け取るプロパティを定義します。
// - id: フォームフィールドの一意の識別子
// - label: フォームフィールドのラベルテキスト
// - type: フォームフィールドの入力タイプ (例: text, password)
// - value: フォームフィールドの現在の値
// - onChange: フォームフィールドの値が変化したときに呼び出される関数
// - className: フォームフィールドの追加クラス名（オプション）
interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// FormField コンポーネントは、ラベル付きの入力フィールドをレンダリングします。
// このコンポーネントは再利用可能で、異なる入力フィールドを簡単に作成できます。
const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, className }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={className}
    />
  </div>
);

// FormField コンポーネントをデフォルトエクスポートとしてエクスポートします。
// これにより、他のファイルからインポートして使用することができます。
export default FormField;