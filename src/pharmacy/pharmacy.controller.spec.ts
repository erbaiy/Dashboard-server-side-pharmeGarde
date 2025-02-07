import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './Dtos/create-pharmacy.dto';
import { UpdatePharmacyDto } from './Dtos/update-pharmacy.dto';
import { HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

describe('PharmacyController', () => {
  let controller: PharmacyController;
  let service: PharmacyService;

  const mockPharmacyService = {
    create: jest.fn(),
    findAll: jest.fn(), 
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [
        {
          provide: PharmacyService,
          useValue: mockPharmacyService,
        },
      ],
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
    service = module.get<PharmacyService>(PharmacyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mock data
  const mockPharmacy = {
    id: '1',
    name: 'Test Pharmacy',
    address: '123 Test St',
    phoneNumber: '1234567890',
    administrator: new Types.ObjectId(),
    nightshift: false,
    weekendshift: false,
    openingHoursNight: '22:00-06:00',
    dutyDate: new Date(),
    imageUrl: 'http://example.com/image.jpg'
  };

  const mockCreateDto: CreatePharmacyDto = {
    name: 'Test Pharmacy',
    address: '123 Test St',
    administrator: new Types.ObjectId(),
    phoneNumber: '1234567890',
    nightshift: false,
    weekendshift: false,
    openingHoursNight: '22:00-06:00',
    dutyDate: new Date(),
    imageUrl: 'http://example.com/image.jpg'
  };

  const mockUpdateDto: UpdatePharmacyDto = {
    name: 'Updated Pharmacy', 
    address: '456 Test Ave'
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pharmacy', async () => {
      mockPharmacyService.create.mockResolvedValue(mockPharmacy);

      const result = await controller.create(mockCreateDto);

      expect(result).toEqual(mockPharmacy);
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when creating pharmacy fails', async () => {
      const error = new Error('Creation failed');
      mockPharmacyService.create.mockRejectedValue(error);

      await expect(controller.create(mockCreateDto)).rejects.toThrow(error);
    });
  });

  describe('findAll', () => {
    it('should return an array of pharmacies', async () => {
      const mockPharmacies = [mockPharmacy];
      mockPharmacyService.findAll.mockResolvedValue(mockPharmacies);

      const result = await controller.findAll();

      expect(result).toEqual(mockPharmacies);
      expect(service.findAll).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no pharmacies exist', async () => {
      mockPharmacyService.findAll.mockResolvedValue([]);
      
      const result = await controller.findAll();
      
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single pharmacy', async () => {
      mockPharmacyService.findOne.mockResolvedValue(mockPharmacy);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockPharmacy);
      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should handle not found pharmacy', async () => {
      mockPharmacyService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a pharmacy', async () => {
      const updatedPharmacy = { ...mockPharmacy, ...mockUpdateDto };
      mockPharmacyService.update.mockResolvedValue(updatedPharmacy);

      const result = await controller.update('1', mockUpdateDto);

      expect(result).toEqual(updatedPharmacy);
      expect(service.update).toHaveBeenCalledWith('1', mockUpdateDto);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when updating pharmacy fails', async () => {
      const error = new Error('Update failed');
      mockPharmacyService.update.mockRejectedValue(error);

      await expect(controller.update('1', mockUpdateDto)).rejects.toThrow(error);
    });
  });

  describe('remove', () => {
    it('should remove a pharmacy', async () => {
      mockPharmacyService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when removing pharmacy fails', async () => {
      const error = new Error('Removal failed');
      mockPharmacyService.remove.mockRejectedValue(error);

      await expect(controller.remove('1')).rejects.toThrow(error);
    });
  });
});
