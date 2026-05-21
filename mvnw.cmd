@echo off
setlocal
set MAVEN_PROJECTBASEDIR=%~dp0
if not "%MAVEN_SKIP_RC%" == "" goto skipMavenRC
if exist "%USERPROFILE%\.mavenrc_pre" call "%USERPROFILE%\.mavenrc_pre"
if exist "%USERPROFILE%\.mavenrc" call "%USERPROFILE%\.mavenrc"
:skipMavenRC
setlocal enabledelayedexpansion
set MAVEN_SKIP_RC=
set MAVEN_OPTS=
set MAVEN_CMD_LINE_ARGS=
set MVNW_VERBOSE=
set MAVEN_DEBUG_OPTS=
if not "%MAVEN_DEBUG%" == "" set MAVEN_DEBUG_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8000
if not "%MAVEN_TERMINATE_CMD%" == "" set MAVEN_CMD_LINE_ARGS=%MAVEN_TERMINATE_CMD%
if "%JAVA_HOME%" == "" goto findJavaFromPath
set JAVA_EXE=%JAVA_HOME%\bin\java.exe
if not exist "%JAVA_EXE%" goto findJavaFromPath
:findJavaFromPath
for %%A in (java.exe) do set JAVA_EXE=%%~$PATH:A
if "%JAVA_EXE%" == "" (
  echo Could not find java.exe in your PATH. Please set the JAVA_HOME environment variable.
  exit /b 1
)
set MAVEN_WRAPPER_JAR=.mvn\wrapper\maven-wrapper.jar
if not exist "%MAVEN_WRAPPER_JAR%" (
  powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.9.9/maven-wrapper-3.9.9.jar' -OutFile '%MAVEN_WRAPPER_JAR%'"
)
"%JAVA_EXE%" %MAVEN_DEBUG_OPTS% -jar "%MAVEN_WRAPPER_JAR%" %MAVEN_CMD_LINE_ARGS% %*
endlocal
