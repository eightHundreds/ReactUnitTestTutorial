{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "type": "shell",
      "label": "测试当前文件",
      "command": "npx ava ./test/${fileBasename} --verbose --watch",
      "group": {
        "kind": "test",
        "isDefault": true
      }
    },
    {
      "type": "shell",
      "label": "测试覆盖(watch)",
      "command": "nodemon --watch ./test/${fileBasename} --exec npx nyc ava ./test/${fileBasename} --tap",
      "group": {
        "kind": "test",
        "isDefault": true
      }
    }
  ]
}
