<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    /**
     * 定義済みバリデーションルールのエラーメッセージ取得
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'ユーザー名が未入力です。',
            'name.string' => 'ユーザー名は文字で入力してください。。',
            'name.max' => 'ユーザー名は255文字まで入力が可能です。',
            'email.required' => 'メールアドレスが未入力です。',
            'email.string' => 'メールアドレスは文字で入力してください。',
            'email.max' => 'メールアドレスは255文字まで入力が可能です。',
            'email.email' => 'メールアドレスの形式で入力してください。',
            'email.unique' => '既に登録されているメールアドレスです。',
            'password.required' => 'パスワードが未入力です。',
            'password.string' => 'パスワードは文字で入力してください。',
            'password.min' => 'パスワードは8文字以上で入力してください。',
            'password.confirmed' => 'パスワードとパスワード（確認用）が一致しません。',
        ];
    }
}
