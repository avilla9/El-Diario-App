import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { CampaignService } from 'src/app/services/explore/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  data;

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
    this.campaignService.campaignList('Campaña')
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
    this.campaignService.campaignData('Campaña', campaign_id)
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
