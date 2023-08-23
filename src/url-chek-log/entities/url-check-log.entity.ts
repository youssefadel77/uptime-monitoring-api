import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UrlCheck } from '../../url-chek/entities/url-chek.entity';

@Entity('url_checks_log')
export class UrlCheckLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  data: string;

  @Column()
  responseTime: number;

  @ManyToOne(() => UrlCheck, (urlCheck) => urlCheck.logs)
  @JoinColumn({ name: 'urlCheckId' })
  urlCheck?: UrlCheck;

  @Column()
  urlCheckId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
