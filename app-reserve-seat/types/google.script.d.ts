declare namespace google {
    namespace script {
      interface Run {
        withSuccessHandler(callback: (result: any) => void): this;
        withFailureHandler(callback: (error: any) => void): this;
        [key: string]: any; // サーバーサイド関数を動的に指定
      }
      const run: Run;
    }
}
