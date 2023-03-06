import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { ChartType } from 'chart.js';
import { CampaignService } from 'src/app/services/explore/campaign.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss'],
})
export class AdoptionComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  data: any = [
    {
      id: 1,
      parentTitle: 'Lo que tengo que saber',
      img: 'adoption/need-know.jpg',
      list: [
        {
          id: 1,
          img: 'adoption/1.png',
          title: 'Luis, Fran y Ana tienen algo que decirte',
          description: '¿Sabes qué cuáles son las 9 Razones por las que ser Agente de SECI?',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
        {
          id: 2,
          img: 'adoption/3.png',
          title: 'Preguntas frecuentes',
          description: 'Y otras dudas que te pueden surgir',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
        {
          id: 3,
          img: 'adoption/4.png',
          title: 'Vídeo #VenteaSECI',
          description: 'Conoce la nueva herramienta #VenteaSECI',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
        {
          id: 4,
          img: 'adoption/4.png',
          title: 'Inforgrafía #VenteaSECI',
          description: 'Descárgala ya',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
      ]
    },
    {
      id: 2,
      parentTitle: 'Lo que tengo que aprender',
      img: 'adoption/need-learn.jpg',
      list: [
        {
          id: 1,
          img: 'adoption/2.png',
          title: 'Las 9 Razones de un vistazo',
          description: "¡Descárgatelas!",
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
      ]
    },
    {
      id: 3,
      parentTitle: 'Lo que tengo que hacer',
      img: 'adoption/need-do.jpg',
      list: [
        {
          id: 1,
          img: 'adoption/1.png',
          title: 'Reto: gana 50€',
          description: 'Los 50 agentes más rápidos en responder, entrarán en un sorteo de 50€. ¡A POR ELLO!',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
        {
          id: 2,
          img: 'adoption/4.png',
          title: 'Capta, recluta y llévate 300€',
          description: 'Accede aquí a Vente a SECI. #Pásalo',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
        {
          id: 3,
          img: 'adoption/1.png',
          title: 'Recursos a tu disposición',
          description: 'Accede a todo lo he hemos preparado para que puedas captar, reclutar y ganar!',
          date: '',
          cta: '',
          cta_content: '',
          internal_route: '',
          link: '',
        },
      ]
    }
  ];

  statistics: any;
  campaignsData: any;
  currentCampaign: any;
  pageStatus: any = false;
  statusMessage = "Cargando...";
  campaignSelected: any;

  constructor(
    public navCtrl: NavController,
    private campaignService: CampaignService,
  ) { }

  ngOnInit() {
    this.campaigns();
  }

  clickBox(list) {
    localStorage.removeItem('post-list');
    localStorage.setItem('post-list', JSON.stringify(list));
    this.navCtrl.navigateForward("/post-list");
  }

  campaigns() {
    this.campaignService.campaignList('Adopción')
      .subscribe((res: any) => {
        this.campaignsData = res;
        this.pageStatus = true;
        this.currentCampaign = res[0];
        this.loadSelectedCampaign(this.currentCampaign);
      }, (err: any) => {
        this.statusMessage = 'Error al cargar la información';
      });
  }

  handleChange(ev) {
    this.currentCampaign = ev.target.value;
    this.loadSelectedCampaign(this.currentCampaign);
  }

  loadSelectedCampaign(campaign_id) {
    this.campaignService.campaignData('Adopción', campaign_id)
      .subscribe((res: any) => {
        console.log(res);
        this.campaignSelected = res;
        this.pageStatus = true;
        this.setStatistics(res[3]);
      }, (err: any) => {
        this.statusMessage = 'Error al cargar la información';
      });
  }

  setStatistics(data) {
    let polize = 0;
    let bonus = 0;
    let incentive = 0;

    if (data.policy_objective > 0) {
      polize = parseFloat((data.policy_raised * 100 / data.policy_objective).toPrecision(2));
    }
    if (typeof (data.bonus) !== 'undefined') {
      bonus = data.bonus;
    }
    if (typeof (data.incentive) !== 'undefined') {
      incentive = data.incentive;
    }

    this.statistics = [
      {
        title: 'Pólizas',
        parameter: polize + '%',
        doughnutChartLabels: [
          'Ventas',
          'Restan',
        ],
        doughnutChartData: [polize, 100 - polize],
        doughnutChartOptions: {
          borderWidth: 1,
          maintainAspectRatio: true,
          cutoutPercentage: 70,
          aspectRatio: 1,
        },
        doughnutChartType: 'doughnut',
        responsive: true,
        doughnutChartLegend: false,
        colors: [
          {
            backgroundColor: [
              'rgb(0, 0, 0)',
              '#bababa',
            ]
          }
        ],
      },
      {
        title: 'Primas',
        parameter: bonus + ' €',
        doughnutChartLabels: [
          'Primas',
        ],
        doughnutChartData: [100],
        doughnutChartOptions: {
          borderWidth: 1,
          maintainAspectRatio: true,
          cutoutPercentage: 70,
          aspectRatio: 1,
        },
        doughnutChartType: 'doughnut',
        responsive: true,
        doughnutChartLegend: false,
        colors: [
          {
            backgroundColor: [
              'rgb(0, 0, 0)',
            ]
          }
        ],
      },
      {
        title: 'Incentivo',
        parameter: incentive + ' €',
        doughnutChartLabels: [
          'Incentivo',
        ],
        doughnutChartData: [100],
        doughnutChartOptions: {
          borderWidth: 1,
          maintainAspectRatio: true,
          cutoutPercentage: 70,
          aspectRatio: 1,
        },
        doughnutChartType: 'doughnut',
        responsive: true,
        doughnutChartLegend: false,
        colors: [
          {
            backgroundColor: [
              'rgb(0, 0, 0)',
            ]
          }
        ],
      },
    ];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
