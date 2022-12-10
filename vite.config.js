import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'; //打包文件视图分析
import viteCompression from 'vite-plugin-compression'; //GZIP 压缩
import postcssPresetEnv from 'postcss-preset-env'; //postCss

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),visualizer({
    emitFile: false,
    file: "stats.html", //分析图生成的文件名
    open:true //如果存在本地服务端口，将在打包后自动展示
  }),viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  })],
  css: {
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  },
  base: './',
  //解决“vite use `--host` to expose”
  server: {
    hmr: true, //热更新
    host: '0.0.0.0',
    // port: 8080,      
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://xxxxxx:8080",
    //     changeOrigin: true, // 允许跨域
    //   },
    // },
  },
  resolve: {
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@A',  /**assets */
        replacement: resolve(__dirname, 'src/assets')
      }
      ,
      {
        find: '@C',  /**components */
        replacement: resolve(__dirname, 'src/components')
      },
      {
        find: '@V',  /**view */
        replacement: resolve(__dirname, 'src/view')
      }
    ]
  },
  build: {
    outDir: 'dist', //输出目录名
    minify: "terser", //压缩方式
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // chunkSizeWarningLimit: 1500,大文件报警阈值设置,不建议使用
    rollupOptions: {
      output: { //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]',
        manualChunks(id) { //分包策略
          if(id.includes('pnpm')){
            //进一步分解pnpm,后期cdn可避免打包其他框架
            return id.toString().split('pnpm/')[1].split('/')[0].toString();
          }
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})
