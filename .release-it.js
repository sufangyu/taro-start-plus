module.exports = {
  "github": {
    "release": true,
    "draft": false
  },
  "git": {
    "commitMessage": "release: v${version}"
  },
  "npm": {
    "publish": false
  },
  "hooks": {
    "after:bump": "echo 更新版本成功"
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "preset": "angular",
      "infile": "CHANGELOG.md",
      "ignoreRecommendedBump": true,
      "strictSemVer": true,
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "feat",
            "section": "✨新功能"
          },
          {
            "type": "fix",
            "section": "🐛问题修复"
          },
          {
            "type": "docs",
            "section": "📝文档"
          },
          {
            "type": "chore",
            "section": "🔨配置文件"
          },
          {
            "type": "style",
            "section": "💄代码格式"
          },
          {
            "type": "release",
            "hidden": "true"
          }
        ]
      }
    }
  }
}
