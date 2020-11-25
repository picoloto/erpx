import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {Item} from '../model/item';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ItemService} from '../service/item.service';
import {CustomConfirmation} from '../../common/models/customConfirmation';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements AfterViewInit {
  itens: Item[] = [];
  columns: any[];
  loading = false;

  constructor(private cdr: ChangeDetectorRef,
              private itemService: ItemService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  async onLazyLoad() {
    this.loading = true;
    const itensResult = await this.itemService.getItens();
    this.itens = [...itensResult];
    this.loading = false;
  }

  removeItem(item: Item) {
    this.confirmationService.confirm(new CustomConfirmation(
      'Você realmente deseja excluir esse item?\n Esta ação não poderá ser desfeita',
      async () => {
        this.loading = true;
        const novosItens = this.itens.filter(i => i.id !== item.id);
        this.itemService.setItens(novosItens)
          .then(() => {
            this.itens = novosItens;
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Item excluído com sucesso'});
            this.loading = false;
          }, error => {
            this.messageService.add({severity: 'error', summary: 'Atenção', detail: error});
            this.loading = false;
          });
      }
    ));
  }

  editaItem(item: Item) {
    console.log('editaItem', item);
  }
}