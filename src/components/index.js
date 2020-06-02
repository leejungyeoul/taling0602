import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Jumbotron, Button} from 'reactstrap';
import {  Card, CardImg, CardText, CardBody,  CardTitle, CardSubtitle} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Spinner } from 'reactstrap';
import { UncontrolledCollapse} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import axios from "axios";
import Swal from 'sweetalert2'
const ipAPI = '//api.ipify.org?format=json'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //퀴즈 감염 리스트 변수
      responseList : '',
      append_List : '',
      colortype : "",
      answertype : "",

      //퀴즈 정책/법률 리스트 변수
      responseList2 : '',
      append_List2 : '',
      colortype2 : "",
      answertype2 : "",

      //퀴즈 사회 리스트 변수
      responseList3 : '',
      append_List3 : '',
      colortype3 : "",
      answertype3 : "",

      map : "",
      naviflag:true,

      tg_flag1 : true,
      tg_flag2 : true,
      tg_flag3 : true,

      today : true,
      total : true,
      
    };
  }
  
  // 접속자수 호출
  select_count = async () => {
    //SW Tool List 호출
    axios.post('http://13.125.127.240:5000/api/Swtool?type=countselect&flag=s', {
    })
    .then( response => {
      this.state.today = response.data.json[0].CNT
      this.state.total = response.data.json[0].TOTAL
      $('#span_id1').text(this.state.total);
      $('#span_id2').text(this.state.today);
    })
    .catch( error => {return false;} );
  }

  // 접속자수 증가
  insert_count = async () => {
    fetch(ipAPI)
    .then(response => response.json())
    .then(data => 
      //SW Tool List 호출
      axios.post('http://13.125.127.240:5000/api/Swtool?type=countinsert&ip='+data.ip, {
      })
      .then( response => {
      })
      .catch( error => {return false;} )
    )
  }

  apiCall = (type, num, callbackFunc) => {
    axios.get('/account_info.json')
    .then( response => {
      try {
        if(type == "infect"){
          this.setState({ responseList: response });
          this.setState({ append_List: this.CDMListAppend("infect", num) });
        }else if(type == "law"){
          this.setState({ responseList2: response });
          this.setState({ append_List2: this.CDMListAppend("law", num) });
        }else if(type == "social"){
          this.setState({ responseList3: response });
          this.setState({ append_List3: this.CDMListAppend("social", num) });
        }else if(type == "all"){
          this.setState({ responseList: response });
          this.setState({ append_List: this.CDMListAppend("infect", num) });
          this.setState({ responseList2: response });
          this.setState({ append_List2: this.CDMListAppend("law", num) });
          this.setState({ responseList3: response });
          this.setState({ append_List3: this.CDMListAppend("social", num) });
        }
        callbackFunc()
      } catch (error) {
        alert(error)
      }
    })
    .catch( error => {alert(error);return false;} );
  }

  
  CDMListAppend = (type, num) => {
    let result = []
    var CDMList = this.state.responseList.data
  
    var CDM_list = CDMList.CDM
    var tg1 = ""
    var tg2 = ""
    var tg3 = ""
    var tg4 = ""
    if(type == "infect"){
      CDM_list = CDMList.CDM
      tg1 = "toggler1"
      tg2 = "#toggler1"
      tg3 = "toggl1"
      tg4 = "toggl11"
    }else if(type == "law"){
      CDM_list = CDMList.CDM2
      tg1 = "toggler2"
      tg2 = "#toggler2"
      tg3 = "toggl2"
      tg4 = "toggl22"
    }else if(type == "social"){
      CDM_list = CDMList.CDM3
      tg1 = "toggler3"
      tg2 = "#toggler3"
      tg3 = "toggl3"
      tg4 = "toggl33"
    }

    var upper = CDM_list.length -1
    var lower = 1
    var int = Math.floor(Math.random() * (upper - lower + 1)) + lower

    for(let i=0; i<CDM_list.length; i++){
      if(i == int){

        var data = CDM_list[i]
        var num = i+1

        if(data.정답타입 == '긍정'){
          this.state.colortype = "primary"
          this.state.answertype = "O"
        }else if(data.정답타입 == '세모'){
          this.state.colortype = "warning"
          this.state.answertype = "▲"
        }else if(data.정답타입 == '부정'){
          this.state.colortype = "danger"
          this.state.answertype = "X"
        }

          result.push(
            <Card style={{"text-align": "left"}}>
              <CardImg top width="100%" className='ohdsi_img3' src={require("../img/"+data.이미지)} alt="Card image cap" />
              <CardBody>
                <CardTitle>Q{num}</CardTitle>
                <CardSubtitle>{data.대질문}</CardSubtitle>
                <CardText style={{color:'#08088A', "font-family":"Arial, Helvetica, sans-serif"}}>
                {data.소질문}
                </CardText>
                {/* <Button style={{"margin-right":"10px"}}  id={num} onClick={(e) => this.before(type, e)}>&#60;</Button> */}
                <Button style={{"margin-right":"10px", "background-color":"#0040FF", "display":"none"}} color="primary" id={tg1 } >O</Button>
                <Button style={{"margin-right":"10px", "background-color":"#0040FF"}} color="primary" tgid = {tg1} rts={data.정답타입} onClick={(e) => this.oxbutton('긍정', type, e)} id={tg4 } >O</Button>
                <Button style={{"margin-right":"10px", "display":"none"}} color="warning" id={tg1} >▲</Button>
                <Button style={{"margin-right":"10px"}} color="warning" tgid = {tg1}  rts={data.정답타입} onClick={(e) => this.oxbutton('세모', type, e)} id={tg4} >▲</Button>
                <Button style={{"margin-right":"10px", "display":"none"}} color="danger" id={tg1} >X</Button>
                <Button style={{"margin-right":"10px"}} color="danger" tgid = {tg1}  rts={data.정답타입} onClick={(e) => this.oxbutton('부정', type, e)} id={tg4} >X</Button>
                <Button id={num} onClick={(e) => this.before(type, e)}>다음문제</Button>
              </CardBody>
            </Card>
          )

          if(data.정답타입 == '긍정'){
            result.push(
              <UncontrolledCollapse toggler={tg1} id={tg3}>
              <Card>
                <CardBody>
                <Button color={this.state.colortype} id="toggler">{this.state.answertype}</Button><br></br>
                  {data.긍정}
                  <br></br>
                  <b style={{color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>출처 : {data.긍정출처}</b>
                </CardBody>
              </Card>
              </UncontrolledCollapse>
            )
          }else if(data.정답타입 == '세모'){
            result.push(
              <UncontrolledCollapse toggler={tg2} id={tg3}>
              <Card>
                <CardBody>
                <Button color={this.state.colortype} id="toggler">{this.state.answertype}</Button><br></br>
                  {data.긍정}
                  <br></br>
                  <b style={{color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>출처 : {data.긍정출처}</b>
                </CardBody>
                <CardBody>
                  {data.부정}
                  <br></br>
                  <b style={{color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>출처: {data.부정출처}</b>
                </CardBody>
              </Card>
              </UncontrolledCollapse>
            )
          }else if(data.정답타입 == '부정'){
            result.push(
              <UncontrolledCollapse toggler={tg2} id={tg3}>
              <Card>
                <CardBody>
                <Button color={this.state.colortype} id="toggler">{this.state.answertype}</Button><br></br>
                  {data.부정}
                  <br></br>
                  <b style={{color:'#57ca57', "font-family":"Arial, Helvetica, sans-serif"}}>출처: {data.부정출처}</b>
                </CardBody>
              </Card>
              </UncontrolledCollapse>
            )
          }
        }
    }
    return result
  }

  sweetalert = (text, img,e) =>{
    Swal.fire({
      title: text,
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("`+img+`")
        left top
        no-repeat
      `
    })
  }

  oxbutton = (rtype, type, e) => {
    var rts = e.target.getAttribute("rts")
    var tgid = e.target.getAttribute("tgid")


    if(type == "infect"){
      var show = $("#toggl1").attr("class")
      show = String(show);
      if(show.indexOf("show") == -1){
        if(rtype == rts){
          this.sweetalert('정답입니다.', 'https://media1.tenor.com/images/a361189263d3e74ee97fdf76fc4c79e4/tenor.gif?itemid=9853797')
        }else{
          this.sweetalert('정답이 아닙니다.', 'https://media1.tenor.com/images/35b92b5353d316f4877236f15dbe11b6/tenor.gif?itemid=9853808')
        }
      }
    }else if(type == "law"){
      var show = $("#toggl2").attr("class")
      show = String(show);
      if(show.indexOf("show") == -1){
        if(rtype == rts){
          this.sweetalert('정답입니다.', 'https://media1.tenor.com/images/a361189263d3e74ee97fdf76fc4c79e4/tenor.gif?itemid=9853797')
        }else{
          this.sweetalert('정답이 아닙니다.', 'https://media1.tenor.com/images/35b92b5353d316f4877236f15dbe11b6/tenor.gif?itemid=9853808')
        }
      }
    }else if(type == "social"){
      var show = $("#toggl3").attr("class")
      show = String(show);
      if(show.indexOf("show") == -1){
        if(rtype == rts){
          this.sweetalert('정답입니다.', 'https://media1.tenor.com/images/a361189263d3e74ee97fdf76fc4c79e4/tenor.gif?itemid=9853797')
        }else{
          this.sweetalert('정답이 아닙니다.', 'https://media1.tenor.com/images/35b92b5353d316f4877236f15dbe11b6/tenor.gif?itemid=9853808')
        }
      }
    }

    $( "#"+tgid ).click();
  }

  before = (type, e) => {
    var num = Number(e.target.id) - 1
    if(num == -1){
      if(type == "infect"){
        num = this.state.responseList.data.CDM.length - 1
      }else if(type == "law"){
        num = this.state.responseList.data.CDM2.length - 1
      }else if(type == "social"){
        num = this.state.responseList.data.CDM3.length - 1
      }
    }
    if(type == "infect"){
      var show = $("#toggl1").attr("class")
      show = String(show);
      if(show.indexOf("show") > -1){
        $( "#toggler1" ).click();
      }
    }else if(type == "law"){
      var show = $("#toggl2").attr("class")
      show = String(show);
      if(show.indexOf("show") > -1){
        $( "#toggler2" ).click();
      }
    }else if(type == "social"){
      var show = $("#toggl3").attr("class")
      show = String(show);
      if(show.indexOf("show") > -1){
        $( "#toggler3" ).click();
      }
    }
    this.apiCall(type, num, function() {})
  } 

  next = (type, e) => {
    var num = Number(e.target.id) + 1
    if(type == "infect" && num == this.state.responseList.data.CDM.length){
      num = 0
    }else if(type == "law" && num == this.state.responseList.data.CDM2.length){
      num = 0
    }else if(type == "social" && num == this.state.responseList.data.CDM3.length){
      num = 0
    }

    var show = $(".show").attr('class')
    show = String(show)
    if(show.indexOf("show") > -1){
      if(type == "infect"){
        $( "#toggler1" ).click();
      }else if(type == "law"){
        $( "#toggler2" ).click();
      }else if(type == "social"){
        $( "#toggler3" ).click();
      }
    }
    this.apiCall(type, num, function() {})
  } 

  toggleclick = (type, e) => {alert()
    if(type == this.state.colortype){
      alert("정답입니다.")
    }else{
      alert("정답을 확인하세요.")
    }
  }

  //페이지 로딩후 실행
  componentDidMount() {
    $('html').scrollTop(0);
    this.select_count()
    this.insert_count()
    $('#parent4').hide()
    $('#map').hide()
    
    var tthis = this

    //json 데이터 호출 함수(퀴즈 데이터)
    this.apiCall("all" ,0, function() {// 데이터 호출 후 레이아웃 사이즈 조절
      var userAgent = window.navigator.userAgent;
      tthis.state.img_width = document.body.offsetWidth
  
      var filter = "win16|win32|win64|mac|macintel"; if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
          tthis.state.channel = 'mobile'
          $( ".button1" ).css( "font-size", "100%" );
        } else {
          tthis.state.img_width = tthis.state.img_width - 40
          tthis.state.channel = 'pc'
          $( ".ohdsi_img3" ).css( "width", width/5 );
        }
      }
      var img_width = parseInt(tthis.state.img_width)
      var img_height = img_width * 1000000000000000
      tthis.state.img_height =  img_height / 3242268041237113
      
      tthis.state.button_width = tthis.state.img_width/4 - 4
      tthis.state.button_height = tthis.state.button_width/2
      var width = document.body.offsetWidth

        $( ".button1" ).css( "width", width/3 );
        $( ".button42" ).css( "width", width/3 );
        $( ".button43" ).css( "width", width/3 );
        $( "#ohdsi_img" ).css( "width", width );
        $( "#ohdsi_img2" ).css( "width", width/2 );

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      // if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 72)
          }, 1000, "easeInOutExpo");
          return false;
        }
      // }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // // Collapse Navbar
    // var navbarCollapse = function() {
    //   if ($("#mainNav").offsetTop > 100) {
    //     $("#mainNav").addClass("navbar-scrolled");
    //   } else {
    //     $("#mainNav").removeClass("navbar-scrolled");
    //   }
    // };
    try {
      var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-scrolled");
        } else {
          $("#mainNav").removeClass("navbar-scrolled");
        }
      };
    } catch (error) {
      
    }
    // Collapse Navbar
    navbarCollapse();
    $(window).scroll(navbarCollapse);
   })

  }

  nav_button = (type, e) => {
    if(this.state.naviflag){
      $(".navbar-collapse").addClass("show");
      this.state.naviflag = false
    }else{
      $(".navbar-collapse").removeClass("show");
      this.state.naviflag = true
    }
  }

  nav_button2 = (type, e) => {
      $(".navbar-collapse").removeClass("show");
      this.state.naviflag = true
  }
  active = (id, e) => {
    $('#'+id).addClass("active"); 
    if($('#a1').hasClass("active") && $('#a2').hasClass("active") && $('#a3').hasClass("active") && $('#a4').hasClass("active") && $('#a5').hasClass("active")
    && $('#a6').hasClass("active")){
      $(".list-group2").hide()
      $(".bg-primary2").hide()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '모두 읽었습니다.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  hide_brief = ( e) => {
    $(".list-group2").hide()
    $(".bg-primary2").hide()
  }

  render() {
    return (
      <body id="page-top">
      <section class="page-section bg-primary2" id="infoBrief">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <h4 class="text-white mt-0">2월 19일 정례 브리핑</h4>
              <h5 class="text-white mt-0">중앙사고수습본부</h5>
              <h6 class="text-white3 mt-0">읽은 내용을 터치해주세요</h6>
            </div>
          </div>
        </div>
      <ul class="list-group2">
        <li class="list-group-item" id="a1" onClick={(e) => this.active('a1',e)}>
          <h5 class="list-group-item-heading">1. 코로나 감염자 15명 추가</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 완치 포함 감염자 총 46명<br></br># 15명 중 13명은 대구, 경북 지역 <br></br># 이 중 11명은 31번째 환자와 연관<br></br># 동일교회 10명, 병원접촉 1명, 2명 확인 중</p>
        </li>
        <li class="list-group-item" id="a2" onClick={(e) => this.active('a2',e)}>
          <h5 class="list-group-item-heading">2. 진단검사 물량 1일 5천건까지 가능하도록 확충</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 검사대상자 기준 확대<br></br># 검체 채취가 가능한 선별진료소 464개소 확대</p>
        </li>
        <li class="list-group-item" id="a3" onClick={(e) => this.active('a3',e)}>
          <h5 class="list-group-item-heading">3. 완치자 현황</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 12명이 완치 후 퇴원<br></br># 오늘 4명 더 퇴원 예정</p>
        </li>
        <li class="list-group-item" id="a4" onClick={(e) => this.active('a4',e)}>
          <h5 class="list-group-item-heading">4. 대구 시민 분들께 협조 부탁</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 기침, 발열 발생시 병의원이나 응급실 바로  가지 말 것<br></br># 1339 콜센터, 보건소에 문의 후 선별진료소로 이동 당부<br></br># 발열이 없다면 가급적 집에서 휴식</p>
        </li>
        <li class="list-group-item" id="a5" onClick={(e) => this.active('a5',e)}>
          <h5 class="list-group-item-heading">5. 건강보험 급여비 조기지급 특례 시행중</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 어려움 겪는 의료기관 지원<br></br># 청구확인 절차만 거친 후 10일 이내 90% 지급</p>
        </li>
        <li class="list-group-item" id="a6" onClick={(e) => this.active('a6',e)}>
          <h5 class="list-group-item-heading">6. 일본 크루즈선 내 우리 국민</h5>
          <p class="list-group-item-text" style={{"font-weight": "bold"}}># 오늘 오전 6시27분 귀국희망자 7명 이송완료<br></br># 우리 국민6명, 일본인 배우자 1명 <br></br> # 국립인천공항검역소 중앙검역의료지원센터로 이동 14일간 격리예정</p>
        </li>
      </ul>
      <Button color="primary" onClick={(e) => this.hide_brief(e)} size="lg" block>브리핑 숨기기</Button>
      </section>
      <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container">
          <a class="navbar-brand" href="#page-top">Easy To Corona</a>
          <button class="navbar-toggler navbar-toggler-right" onClick={(e) => this.nav_button(e)} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto my-2 my-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#about" onClick={(e) => this.nav_button2(e)} >코로나 O / X</a>
              </li>
              <li class="nav-item">
                {/* <a class="nav-link" href="/index_map">내가 감연된다면?</a> */}
                <Link to={'/index_map'} className="nav-link" onClick={(e) => this.nav_button2(e)}v>지도</Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#infect" onClick={(e) => this.nav_button2(e)} >쉬운 말 보도자료(개발중)</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact" onClick={(e) => this.nav_button2(e)}>Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header class="masthead">
        <div class="container h-100">
          <div class="row h-100 align-items-center justify-content-center text-center">
            <div class="col-lg-10 align-self-end">
              <h1 class="text-uppercase text-white font-weight-bold">more simply, more easily</h1>
              <h1 class="text-uppercase text-white font-weight-bold">Understand the corona</h1>
              <hr class="divider my-4"/>
            </div>
            <div class="col-lg-8 align-self-baseline">
              <p class="text-white-75 font-weight-light mb-5">코로나 관련 정보를 쉽고 간단하게 정리해 제공하는 것이 이 사이트이 목적입니다. </p>
              <a class="btn btn-primary btn-xl" href="#about">코로나 O / X 시작하기</a>
              <br></br>
              <Link to={'/index_map'} class="btn btn-primary1 btn-xl" style={{"background-color": "#36bd53"}}>확진자 위치 지도보기</Link>
              <p class="text-white-75 font-weight-light mb-5">(네이버, 크롬, 사파리 권장)</p>
            </div>
          </div>
        </div>
      </header>
    
      <section class="page-section bg-primary" id="about">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <h4 class="text-white2 mt-0">코로나 관련 지문을 읽고</h4>
              <h4 class="text-white2 mt-0">O / ▲ / X 중에 선택해주세요</h4>
              <h5 class="text-white mt-0"> O : 거의 그렇다 </h5>
              <h5 class="text-white mt-0"> ▲ : 어느정도 그렇다 / 명확하지 않다 </h5>
              <h5 class="text-white mt-0"> X : 거의 그렇지 않다 </h5>
              <hr class="divider light my-4"/>
              <p class="text-white-50 mb-4">답안은 언론보도 내용을 토대로 작성하였습니다. &nbsp;잘못된 정보는 하단 이메일로 부탁드립니다.</p>
              <a class="btn btn-light btn-xl" href="#quiz">코로나 O / X 시작</a>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section" id="quiz">
        <div class="container">
          <div>
            <Jumbotron>
              <p className="lead">감염</p>
              <hr className="my-2" />
              <p>감염 관련 주제입니다.</p>
              <p className="lead">
                {this.state.append_List}
              </p>
            </Jumbotron>
          </div>
          <div>
            <Jumbotron>
              <p className="lead">정책/법률</p>
              <hr className="my-2" />
              <p>정책 & 법률 관련 주제입니다.</p>
              <p className="lead">
                {this.state.append_List2}
              </p>
            </Jumbotron>
          </div>
          <div>
            <Jumbotron>
              <p className="lead">사회/경제</p>
              <hr className="my-2" />
              <p>사회/경제 관련 주제입니다.</p>
              <p className="lead">
                {this.state.append_List3}
              </p>
            </Jumbotron>
          </div>
          <hr></hr>

        </div>
      </section>

      {/* <section id="portfolio">
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/1.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/1.jpg")} alt=""/>
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/2.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/2.jpg")} alt=""/>
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/3.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/3.jpg")} alt=""/>
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/4.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/4.jpg")} alt=""/>
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/5.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/5.jpg")} alt=""/>
                <div class="portfolio-box-caption">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
            <div class="col-lg-4 col-sm-6">
              <a class="portfolio-box" href="img/portfolio/fullsize/6.jpg">
                <img class="img-fluid" src={require("../img/portfolio/thumbnails/6.jpg")} alt=""/>
                <div class="portfolio-box-caption p-3">
                  <div class="project-category text-white-50">
                    Category
                  </div>
                  <div class="project-name">
                    Project Name
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section> */}
    
      {/* <section class="page-section bg-dark text-white">
        <div class="container text-center">
          <h2 class="mb-4">Free Download at Start Bootstrap!</h2>
          <a class="btn btn-light btn-xl" href="https://startbootstrap.com/themes/creative/">Download Now!</a>
        </div>
      </section> */}
    
      <section class="page-section" id="contact">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="dark" />
            <Spinner type="grow" color="light" />
            <h4>접속자수 TOTAL : <span id="span_id1"></span>명</h4>
            <h4>접속자수 TODAY : <span id="span_id2"> </span>명</h4>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="dark" />
            <Spinner type="grow" color="light" />
              <h2 class="mt-0">Get In Touch</h2>
              <hr class="divider my-4"/>
              <p class="text-muted mb-5">잘못된 정보나 오류 발견시 메일주시면 수정하겠습니다.</p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <i class="fas fa-phone fa-3x mb-3 text-muted"></i>
              <div>개발자 이정열</div>
            </div>
            <div class="col-lg-4 mr-auto text-center">
              <i class="fas fa-envelope fa-3x mb-3 text-muted"></i>
              <a class="d-block" href="mailto:ljung5@naver.com">ljung5@naver.com</a>
            </div>
          </div>
          <hr></hr>
          <div class="row">
            <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <i class="fas fa-phone fa-3x mb-3 text-muted"></i>
              <div>Logical Support</div>
            </div>
            <div class="col-lg-4 mr-auto text-center">
              <i class="fas fa-envelope fa-3x mb-3 text-muted"></i>
              <a class="d-block"><b style={{color:'rgb(87, 154, 202)'}}>연세대 사회학과 성연찬 님</b></a>
            </div>
          </div>
        </div>
      </section>
    
      <footer class="bg-light py-5">
        <div class="container">
          <div class="small text-center text-muted">Copyright &copy; 2019 - Start Bootstrap</div>
        </div>
      </footer>
    
      <script src="vendor/jquery/jquery.min.js"></script>
      <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    
      <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
      <script src="vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
    
      <script src="js/creative.min.js"></script>
    
    </body>
    );
  }
}

export default App;
