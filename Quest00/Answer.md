## Answer The Checklist 
### 형상관리 시스템은 왜 나오게 되었을까요?  

 * 팀원들과 소스코드를 공유하여 버전 충돌 없이 수월하게 협업
 * 기존 소프트웨어를 여러 개의 버전으로 나누어서 개발할 때 유용
 * 문제발생이나 기능적인 이유로 이전 버전으로 돌아가야할 시 소스코드 변경이력 관리를 통해 손쉽게 문제를 추적하고 이전 버전으로 돌아가기 위함

***
### git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요?
* 분산버전 관리시스템(DVCS, Distributed Version Control System)

특징
1. 팀원들이 복사된 프로젝트에서 동시에 작업을 진행하므로``분산 작업``이 효율적
2. 모든 작업이 대부분 로컬에서 진행되므로 ``가볍고 빠름``
3. 동일한 소프트웨어를 여러가지 버전으로 만드는``Branch``와 그걸 합치는 ``Merge``환경을 제공
4. Commit ID를 통한 ``무결성 보장`` 및 ``Version History 관리`` 
5. 준비영역``Staging area`` 을 통한 검토
6. ``오픈소스``
***
### 분산형 형상관리 시스템이란 무엇일까요?
server가 존재하지만 필요한 부분만을 다운받는 것이 아닌 프로젝트 전체를 다운 받은 뒤 수정하여 버전을 관리하는 방식  

server에 문제가 생기더라도 프로젝트 전체를 가지고 있기 때문에 괜찮고 수정 시에도 충돌 염려가 없다.

#### git은 어떻게 개발되게 되었을까요? git이 분산형 시스템을 채택한 이유는 무엇일까요?
``리누스 토르발스``라는 개발자가 당시 사용 가능했던 버전관리 시스템 중 자신을 만족시킬만한 것이 없었고 모종의 사건으로 인해 그냥 직접 버전관리시스템을 만들기로 결정하여 개발시작  

채택이유 :
1. 빠른 속도로 일을 처리하며 협업이 가능
2. 우연이든 악의적이든 변질에 대비해 강력한 안전기준이 필요
3. 기존 쓰던 Bitkeeper같은 분산형 워크플로를 원했음
      

***

### git과 GitHub은 어떻게 다를까요?  
  ``Git``은 변경이력을 관리해주고 같은 파일에 대한 각기 다른 버전을 로컬저장소에 보관해주는 ``Software``이다.    
  ``GitHub``는  ``Git``의 원격 저장소의 개념으로 클라우드 방식으로 관리되는 일종의 ``Service``이다
***
### git의 clone/add/commit/push/pull/branch/stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
* clone : git으로 관리할 저장소를 git에 복제  
* add : 변경사항을 commit에 포함
* commit : 변경사항을 확정
* push : 원격 저장소로 전송
* pull : 원격 저장소에서 로컬저장소로 가져옴
* branch : branch 목록 확인 , 뒤에 <branch name>시 branch 생성
* stash : 하던 작업을 멈추고 브랜치를 변경해야할 때 commit 대신 현재의 상태를 임시로 저장

```
$git clone  <https:.. URL> | /로컬/저장소/경로 | 사용자명@호스트:/원격/저장소/경로
$ git add <파일명> | *   // * 전부를 의미
$ git commit -m "커밋 메시지"
$ git push origin master
$ git branch
$ git stash
```
***

### git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
* Object : git 은 기본적으로 키-값 (key-value) 저장소로 볼 수 있다. git 에 데이터를 추가 시, git 은 객체(object) 를 생성한 후 해당 객체 내용의 SHA-1 해시값을 key 로써 사용
* Head : 현재 체크아웃된 커밋 = 현재 작업중인 커밋(작업트리의 가장 최근 커밋을 가르킴)
* Commit : 의미 있는 변화에 대해 기록
* Branch :  독립적으로 어떤 작업을 진행하기 위한 개념(분기점,가지 이런 느낌)
* Tag :  특정 커밋을 태그, 읽기전용 커밋(수정불가),특정 커밋을 쉽게 찾기위한 이정표


* 로컬에 저장하며 log 로 조회
***
### 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야 할까요?
rm --cached 사용
```
git rm --cached -r 폴더명
git rm --cached -r 파일명 또는 git rm --cached 파일명 
```

***
# Advanced
### Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
* Mercurial을 Git과 같이 분산형 형상관리 시스템
* 사용하기 쉬운 GUI
* 프로젝트 규모에 비례하여 저장소의 크기가 완만하게 증가
* 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
git을 주로 쓰는듯, 마이크로소프트가 깃허브를 인수하기도 했고