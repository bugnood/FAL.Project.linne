// ログイン画面のAPI処理を行う関数

// ユーザー名とパスワードを受け取り、ログインを試行し、結果のメッセージを返す
export async function getLoginUser(username: string, password: string): Promise<string> {
    try {
        // APIエンドポイントにログイン情報を送信してログインを試行
        const response = await fetch('http://localhost:5002/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // レスポンスが正常でない場合はエラーを投げる
        if (!response.ok) {
            throw new Error('Login failed');
        }

        // レスポンスデータからメッセージを取得して返す
        const data = await response.json();
        return data.message;
    } catch (error) {
        // エラーが発生した場合はログイン失敗としてエラーを投げる
        throw new Error('Login failed');
    }
}

export default getLoginUser;