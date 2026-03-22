@Entity
@Table(name = "restaurant_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int capacity;

    @Enumerated(EnumType.STRING)
    private Zone zone;

    private int posX;
    private int posY;

    @ElementCollection(targetClass = TableFeature.class)
    @CollectionTable(
            name = "table_features",
            joinColumns = @JoinColumn(name = "table_id")
    )
    @Column(name = "feature")
    @Enumerated(EnumType.STRING)
    private Set<TableFeature> features;
}